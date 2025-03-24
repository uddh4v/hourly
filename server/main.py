from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from hashlib import sha256
import jwt
import datetime
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Secret key for JWT encoding/decoding
SECRET_KEY = "your_secret_key_here"

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory user database
fake_users_db = {
    "user@example.com": {
        "email": "user@example.com",
        "hashed_password": sha256("password123".encode()).hexdigest(),
    }
}

# Pydantic models
class LoginRequest(BaseModel):
    email: str
    password: str

# Password verification function
def verify_password(stored_hash, password):
    return stored_hash == sha256(password.encode()).hexdigest()

# JWT creation function
def create_jwt_token(email: str):
    payload = {
        "sub": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        "iat": datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

# JWT authentication dependency
security = HTTPBearer()

def verify_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Login endpoint
@app.post("/login")
def login(request: LoginRequest):
    user = fake_users_db.get(request.email)

    if user is None or not verify_password(user["hashed_password"], request.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_jwt_token(request.email)
    return {"message": "Login successful!", "token": token}

# Protected route example
@app.get("/protected")
def protected_route(user_email: str = Depends(verify_jwt)):
    return {"message": f"Hello {user_email}, you have access to this protected route!"}
