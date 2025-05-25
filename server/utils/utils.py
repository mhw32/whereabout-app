from fastapi import Depends
from fastapi.security import (
    HTTPBasic,
    HTTPBearer,
    HTTPAuthorizationCredentials,
    HTTPBasicCredentials,
)
from firebase_admin import auth
from .schemas import FBUser

security = HTTPBearer()

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
