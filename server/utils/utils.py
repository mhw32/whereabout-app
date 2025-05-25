from typing import Optional
from fastapi import Depends, HTTPException
from fastapi.security import (
    HTTPBasic,
    HTTPBearer,
    HTTPAuthorizationCredentials,
    HTTPBasicCredentials,
)
from firebase_admin import auth
from .schemas import FBUser, User, Location, Event
from .database import get_firebase_client

security = HTTPBearer()
db = get_firebase_client()

RELATION_FRIEND = 1

def get_firebase_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> FBUser:
    id_token: str = credentials.credentials
    # This call will raise errors if the token is invalid
    decoded_token = auth.verify_id_token(id_token)
    fb_auth_user = FBUser(
        # We expect name and picture to be None when user authenticates via Apple auth
        name=decoded_token.get('name', None),
        picture=decoded_token.get('picture', None),
        iss=decoded_token['iss'],
        aud=decoded_token['aud'],
        auth_time=decoded_token['auth_time'],
        user_id=decoded_token['user_id'],
        sub=decoded_token['sub'],
        iat=decoded_token['iat'],
        exp=decoded_token['exp'],
        email=decoded_token['email'],
        email_verified=decoded_token['email_verified'],
        uid=decoded_token['uid'],
    )
    return fb_auth_user

def query_user(user_id: str) -> Optional[User]:
    user_ref = db.collection("Users").document(user_id)
    user = user_ref.get()
    if user.exists:
        # pass through the pydantic model to standardize
        user = User.model_validate(user.to_dict())
        return user
    return None

def query_location(location_id: str) -> Optional[Location]:
    location_ref = db.collection("Locations").document(location_id)
    location = location_ref.get()
    if location.exists:
        # pass through the pydantic model to standardize
        location = Location.model_validate(location.to_dict())
        return location
    return None

def query_event(event_id: str) -> Optional[Event]:
    event_ref = db.collection("Events").document(event_id)
    event = event_ref.get()
    if event.exists:
        # pass through the pydantic model to standardize
        event = Event.model_validate(event.to_dict())
        return event
    return None
