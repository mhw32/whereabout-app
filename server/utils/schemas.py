from typing import Optional
from pydantic import BaseModel

class FBUser(BaseModel):
    '''Firebase user'''
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
    userId: str
    email: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    notificationToken: Optional[str] = None
    createdAt: int
    updatedAt: int

class Location(BaseModel):
    locationId: str
    centerX: float
    centerY: float
    width: float
    height: float
    tag: Optional[str] = None
    category: Optional[str] = None
    createdAt: int
    updatedAt: int

class Event(BaseModel):
    userId: str
    locationId: str
    createdAt: int
    updatedAt: int

# --- pydantic utilities ---

def user_to_pydantic(user) -> User:
    return User.model_validate(user.to_dict())

def location_to_pydantic(location, location_id: str) -> Location:
    location_dict = location.to_dict()
    location_dict['locationId'] = location_id
    return Location.model_validate(location_dict)

def event_to_pydantic(event, event_id: str) -> Event:
    event_dict = event.to_dict()
    event_dict['eventId'] = event_id
    return Event.model_validate(event_dict)
