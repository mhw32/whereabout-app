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

# --- location requests ---

# --- event requests ---
