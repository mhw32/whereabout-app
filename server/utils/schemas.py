from typing import Optional
from pydantic import BaseModel

class FBUser(BaseModel):
    name: Optional[str] = None
    picture: Optional[str] = None
    iss: str
    aud: str
    auth_time: int
    user_id: str
    sub: str
    iat: int
    exp: int
    email: str
    email_verified: bool
    uid: str

class User(BaseModel):
    userId: Optional[str] = None
    email: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    token: Optional[str] = None
    createdAt: int
    updatedAt: int

class Relation(BaseModel):
    relationId: Optional[str] = None
    userId: str # user id of requester
    recipientId: str # recipient id
    relation: int # 1 = friend, 2 = block
    createdAt: int
    updatedAt: int

class Location(BaseModel):
    locationId: Optional[str] = None
    userId: str
    latitude: float
    longitude: float
    width: float
    height: float
    tag: str
    category: Optional[str] = None
    createdAt: int
    updatedAt: int

class Event(BaseModel):
    eventId: Optional[str] = None
    userId: str
    locationId: str
    createdAt: int
    updatedAt: int

# --- pydantic utilities ---

def user_to_pydantic(user) -> User:
    return User.model_validate(user.to_dict())

def relation_to_pydantic(relation, relation_id: str) -> Relation:
    relation_dict = relation.to_dict()
    relation_dict['relationId'] = relation_id
    return Relation.model_validate(relation_dict)

def location_to_pydantic(location, location_id: str) -> Location:
    location_dict = location.to_dict()
    location_dict['locationId'] = location_id
    return Location.model_validate(location_dict)

def event_to_pydantic(event, event_id: str) -> Event:
    event_dict = event.to_dict()
    event_dict['eventId'] = event_id
    return Event.model_validate(event_dict)
