import json
import secrets
import requests
from typing import Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from os import environ as env

from .utils import database, schemas, utils

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
