from typing import Optional
from pydantic import BaseModel

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
