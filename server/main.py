from cmath import rect
import json
import secrets
import requests
from time import time
from typing import Optional, Tuple, List
from firebase_admin import firestore
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from os import environ as env

from .utils import database, schemas, utils, requests

# Load environment variables
load_dotenv()

# Initialize firebase client
db = database.get_firebase_client()

# Initialize FastAPI
app = FastAPI(title="whereabout")

# Add CORS to site
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create basic security parameters for admin
admin_security = HTTPBasic()

def check_admin_credentials(credentials: HTTPBasicCredentials = Depends(admin_security)):
    '''Hash comparison for admin username and password.
    '''
    # Make sure credentials are not empty
    if env.get('AUTH_USERNAME') is None or env.get('AUTH_PASSWORD') is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )
    # Fetch the username/password provided by the user
    provided_username_bytes = credentials.username.encode('utf8')
    provided_password_bytes = credentials.password.encode('utf8')
    # Fetch the actual username and password
    master_username_bytes = env['AUTH_USERNAME'].encode('utf8')
    master_password_bytes = env['AUTH_PASSWORD'].encode('utf8')
    # Hashed comparison
    is_correct_username = secrets.compare_digest(provided_username_bytes, master_username_bytes)
    is_correct_password = secrets.compare_digest(provided_password_bytes, master_password_bytes)
    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return True

@app.get("/")
def read_root():
    return {"message": "Welcome to whereabout's server"}

# --- feed endpoints ---

@app.get('/api/feed')
async def fetch_feed(
    page: int = 0,
    limit: int = 10,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
    ) -> List[schemas.FeedItem]:
    '''Fetch latest events for each friend.
    '''
    user_id = fb_user.uid
    # Fetch list of friends
    relation_docs = db.collection("Relations")\
        .where(filter=firestore.firestore.FieldFilter('userId', '==', user_id))\
        .offset(page * limit)\
        .limit(limit)\
        .stream()
    friends: List[schemas.User] = []
    for relation_doc in relation_docs:
        relation = schemas.relation_to_pydantic(relation_doc, relation_doc.id)
        friend_id = relation.recipientId if relation.userId == user_id else relation.userId
        friend = schemas.user_to_pydantic(friend_id)
        friends.append(friend)
    # For each friend
    feed_items: List[schemas.FeedItem] = []
    for friend in friends:
        friend_id = friend.userId
        # Find the latest event
        event_docs = db.collection("Events")\
            .where(filter=firestore.firestore.FieldFilter('userId', '==', user_id))\
            .order_by('updated_at', direction=firestore.Query.DESCENDING)\
            .limit(1)\
            .get()
        if len(event_docs) == 0:
            continue
        event_doc = event_docs[0]
        event = schemas.event_to_pydantic(event_doc, event_doc.id)
        # Fetch the corresponding location
        location_id = event.locationId
        location_doc = db.collection("Locations").document(location_id).get()
        if not location_doc.exists:
            continue
        location = schemas.location_to_pydantic(location_doc, location_id)
        feed_item = schemas.FeedItem(user=friend, event=event, location=location)
        feed_items.append(feed_item)
    return feed_items

# --- user endpoints ---

@app.get('/api/users/{user_id')
async def fetch_user(fb_user: schemas.FBUser = Depends(utils.get_firebase_user)) -> schemas.User:
    '''Fetch a user.
    '''
    user_id = fb_user.uid
    user_doc = db.collection("Users").document(user_id).get()
    if not user_doc.exists:
        raise HTTPException(status_code=400, detail="User does not exist")
    user = schemas.user_to_pydantic(user_doc)
    return user

@app.post('/api/users/create')
async def create_user(
    body: requests.CreateUserRequest,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
    ) -> schemas.User:
    '''Create a user.
    '''
    user_id = fb_user.uid
    user_ref = db.collection("Users").document(user_id).get()
    if user_ref.exists:
        raise HTTPException(status_code=400, detail="User with email already exists")

    now = int(time())
    user = schemas.User(
        userId=user_id,
        email=body.email,
        firstName=body.firstName,
        lastName=body.lastName,
        createdAt=now,
        updatedAt=now,
    )
    # Create the user in Firebase
    try:
        _, user_ref = db.collection("Users").add(user.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write user to Firebase: {e}")

    # Return the user
    user = schemas.user_to_pydantic(user_ref.get())
    return user

@app.post('/api/users/{user_id}/token')
async def update_user_token(
    user_id: str,
    body: requests.UpdateUserTokenRequest,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> schemas.User:
    '''Updates a user in Firebase to set the notification token.
    '''
    user_id = fb_user.uid
    user_ref = db.collection("Users").document(user_id)
    user = user_ref.get()
    if not user.exists:
        raise HTTPException(status_code=400, detail=f"User {user_id} does not exist")
    try:
        user_ref.update({'token': body.token, 'updatedAt': int(time())})
    except Exception as e:
        raise HTTPException(status_code=500, default=f"Failed to write; error: {e}")
    user = user_ref.get()
    user = schemas.User.model_validate(user.to_dict())
    return user

# --- relation endpoints ---

@app.post('/api/friends/create')
async def create_friend(
    body: requests.CreateRelationRequest,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> Tuple[schemas.Relation, schemas.Relation]:
    '''Create a friend / make a relation doc.
    '''
    user_id, recipient_id = fb_user.uid, body.recipientId
    # user cannot be the recipient
    if user_id == recipient_id:
        raise HTTPException(status_code=400, detail=f"User {user_id} cannot equal recipientId")
    now = int(time())
    # Check if relationship already exists
    relations = db.collection("Relations")\
        .where(filter=firestore.firestore.FieldFilter('userId', '==', user_id))\
        .where(filter=firestore.firestore.FieldFilter('recipientId', '==', body.recipientId))\
        .get()
    if len(relations) == 0:
        # If not, create it
        relation = schemas.Relation(
            userId=user_id,
            recipientId=recipient_id,
            relation=utils.RELATION_FRIEND,
            createdAt=now,
            updatedAt=now,
        )
        try:
            _, relation_ref = db.collection('Relations').add(relation.model_dump())
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to write; error: {e}")
        relation = schemas.relation_to_pydantic(relation_ref.get(), relation_ref.id)
    else:
        relation = schemas.relation_to_pydantic(relations[0], relations[0].id)

    # Check if the reverse relationship exists
    inv_relations = db.collection("Relations")\
        .where(filter=firestore.firestore.FieldFilter('userId', '==', body.recipientId))\
        .where(filter=firestore.firestore.FieldFilter('recipientId', '==', user_id))\
        .get()
    if len(inv_relations) == 0:
        # If no reverse relationship, then create a pending request
        inv_relation = schemas.Relation(
            userId=recipient_id,
            recipientId=user_id,
            relation=utils.RELATION_FRIEND,
            createdAt=now,
            updatedAt=now,
        )
        try:
            _, inv_relation_ref = db.collection('Relations').add(relation.model_dump())
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to write; error: {e}")
        inv_relation = schemas.relation_to_pydantic(inv_relation_ref.get(), inv_relation_ref.id)
    else:
        inv_relation = schemas.relation_to_pydantic(inv_relations[0], inv_relations[0].id)

    return relation, inv_relation

@app.post('/api/friends/{friend_id}/delete')
async def unfriend(
    friend_id: str,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> bool:
    '''Unfriend / delete a relation.
    '''
    user_id = fb_user.uid
    # user cannot be the recipient
    if user_id == friend_id:
        raise HTTPException(status_code=400, detail=f"User {user_id} cannot equal recipientId")

    # Check if relationship already exists
    relations = db.collection("Relations")\
        .where(filter=firestore.firestore.FieldFilter('userId', '==', user_id))\
        .where(filter=firestore.firestore.FieldFilter('recipientId', '==', friend_id))\
        .get()
    if len(relations) > 0:
        relation = schemas.relation_to_pydantic(relations[0], relations[0].id)
        relation_ref = db.collection('Relations').document(relation.relationId)
        try:
            relation_ref.delete()
        except Exception as e:
            raise HTTPException(status_code=500, default=f"Failed to write; error: {e}")

    # Check if the inverse relationship already exists
    inv_relations = db.collection("Relations")\
        .where(filter=firestore.firestore.FieldFilter('userId', '==', friend_id))\
        .where(filter=firestore.firestore.FieldFilter('recipientId', '==', user_id))\
        .get()
    if len(inv_relations) > 0:
        inv_relation = schemas.relation_to_pydantic(inv_relations[0], inv_relations[0].id)
        inv_relation_ref = db.collection('Relations').document(inv_relation.relationId)
        try:
            inv_relation_ref.delete()
        except Exception as e:
            raise HTTPException(status_code=500, default=f"Failed to write; error: {e}")

    return True

# --- location endpoints ---

@app.get('/api/locations')
async def fetch_locations(fb_user: schemas.FBUser = Depends(utils.get_firebase_user)) -> List[schemas.Location]:
    '''Fetch locations.
    '''
    user_id = fb_user.uid
    location_docs = db.collection('Locations')\
        .where(filter=firestore.firestore.FieldFilter('userId', '==', user_id))\
        .order_by('updated_at', direction=firestore.Query.DESCENDING)\
        .stream()
    locations = [
        schemas.location_to_pydantic(location_doc, location_doc.id)
        for location_doc in location_docs
    ]
    return locations

@app.get('/api/locations/{location_id}')
async def fetch_location(
    location_id: str,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
    ) -> Optional[schemas.Location]:
    '''Fetch location.
    '''
    location_doc = db.collection('Locations').document(location_id).get()
    if location_doc.exists:
        location = schemas.location_to_pydantic(location_doc, location_doc.id)
        return location
    return None

@app.post('/api/locations/create')
async def create_location(
    body: requests.CreateLocationRequest,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> schemas.Location:
    '''Create a location
    '''
    if body.width <= 0 or body.height <= 0:
        raise HTTPException(status_code=400, default="Width and height cannot be non positive")
    if len(body.tag) == 0:
        raise HTTPException(status_code=400, default="Tag length cannot be zero")

    now = int(time())
    user_id = fb_user.uid
    location = schemas.Location(
        userId=user_id,
        latitude=body.latitude,
        longitude=body.longitude,
        width=body.width,
        height=body.height,
        tag=body.tag,
        createdAt=now,
        updatedAt=now,
    )
    # Create the location in Firebase
    try:
        _, location_ref = db.collection("Locations").add(location.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write location to Firebase: {e}")
    # Return the location
    location = schemas.location_to_pydantic(location_ref.get(), location_ref.id)
    return location

@app.post('/api/locations/{location_id}/edit')
async def edit_location(
    location_id: str,
    body: requests.EditLocationRequest,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> schemas.Location:
    '''Edit a location.
    '''
    if body.width <= 0 or body.height <= 0:
        raise HTTPException(status_code=400, default="Width and height cannot be non positive")
    if len(body.tag) == 0:
        raise HTTPException(status_code=400, default="Tag length cannot be zero")
    location_ref = db.collection("Locations").document(location_id)
    location = location_ref.get()
    if not location.exists:
        raise HTTPException(status_code=400, detail=f"Location {location_id} does not exist")
    try:
        location_ref.update({
            'latitude': body.latitude,
            'longitude': body.longitude,
            'width': body.width,
            'height': body.height,
            'tag': body.tag,
            'category': body.category,
            'updatedAt': int(time()),
        })
    except Exception as e:
        raise HTTPException(status_code=500, default=f"Failed to write; error: {e}")
    location = location_ref.get()
    location = schemas.Location.model_validate(location.to_dict())
    return location

@app.post('/api/locations/{location_id}/delete')
async def delete_location(
    location_id: str,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> bool:
    '''Delete a location
    '''
    location_ref = db.collection("Locations").document(location_id)
    location = location_ref.get()
    if not location.exists:
        raise HTTPException(status_code=400, detail=f"Location {location_id} does not exist")
    try:
        location_ref.delete()
    except Exception as e:
        raise HTTPException(status_code=500, default=f"Failed to delete; error: {e}")
    return True

# --- event endpoints ---

@app.get('/api/events/{event_id}')
async def fetch_event(
    event_id: str,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
    ) -> Optional[schemas.Event]:
    '''Fetch location.
    '''
    event_doc = db.collection('Events').document(event_id).get()
    if event_doc.exists:
        event = schemas.event_to_pydantic(event_doc, event_doc.id)
        return event
    return None

@app.post('/api/events/create')
async def create_event(
    body: requests.CreateEventRequest,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> schemas.Event:
    '''Create a event
    '''
    now = int(time())
    event = schemas.Event(
        userId=fb_user.uid,
        locationId=body.locationId,
        createdAt=now,
        updatedAt=now,
    )
    # Create the location in Firebase
    try:
        _, event_ref = db.collection("Events").add(event.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write event to Firebase: {e}")
    # Return the event
    event = schemas.event_to_pydantic(event_ref.get(), event_ref.id)
    return event

@app.post('/api/events/{event_id}/delete')
async def delete_event(
    event_id: str,
    fb_user: schemas.FBUser = Depends(utils.get_firebase_user),
) -> bool:
    '''Delete a event
    '''
    event_ref = db.collection("Events").document(event_id)
    event = event_ref.get()
    if not event.exists:
        raise HTTPException(status_code=400, detail=f"Event {event_id} does not exist")
    try:
        event_ref.delete()
    except Exception as e:
        raise HTTPException(status_code=500, default=f"Failed to delete; error: {e}")
    return True
