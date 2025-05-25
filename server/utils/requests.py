from typing import Optional
from pydantic import BaseModel

# --- user requests ---

class CreateUserRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: Optional[str] = None
    token: Optional[str] = None

class UpdateUserTokenRequest(BaseModel):
    userId: str
    token : Optional[str] = None

# --- friend requests ---

class CreateRelationRequest(BaseModel):
    recipientId: str

# --- location requests ---

class CreateLocationRequest(BaseModel):
    userId: str
    latitude: float
    longitude: float
    width: float
    height: float
    tag: str
    category: Optional[str] = None

class EditLocationRequest(BaseModel):
    latitude: float
    longitude: float
    width: float
    height: float
    tag: str
    category: Optional[str] = None

# --- event requests ---

class CreateEventRequest(BaseModel):
    userId: str
    locationId: str
