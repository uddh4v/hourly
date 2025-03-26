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

# In-memory user database for timesheet management
fake_users_db = {
    "admin@example.com": {
        "email": "admin@example.com",
        "hashed_password": sha256("adminpass".encode()).hexdigest(),
        "role": "admin",
        "full_name": "Admin User",
        "position": "Manager",
        "hours_logged": 0
    },
    "uddhavp@cybage.com": {
        "email": "uddhavp@cybage.com",
        "hashed_password": sha256("password123".encode()).hexdigest(),
        "role": "employee",
        "full_name": "Uddhav Powar",
        "position": "Software Engineer",
        "hours_logged": 35
    },
    "rajp@cybage.com": {
        "email": "rajp@cybage.com",
        "hashed_password": sha256("password123".encode()).hexdigest(),
        "role": "employee",
        "full_name": "Raj Pawar",
        "position": "Software Engineer",
        "hours_logged": 35
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


def create_jwt_token(email: str, role: str):
    payload = {
        "sub": email,
        "role": role,
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
        return {"email": payload["sub"], "role": payload["role"]}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Role-based access control


def require_role(required_role: str):
    def role_dependency(user_data: dict = Depends(verify_jwt)):
        if user_data["role"] != required_role:
            raise HTTPException(
                status_code=403, detail="Forbidden: Insufficient permissions")
        return user_data
    return role_dependency

# Login endpoint


@app.post("/login")
def login(request: LoginRequest):
    user = fake_users_db.get(request.email)
    if user is None or not verify_password(user["hashed_password"], request.password):
        raise HTTPException(
            status_code=400, detail="Invalid email or password")
    token = create_jwt_token(request.email, user["role"])
    return {"message": "Login successful!", "token": token, "status": "success"}

# Get user details


@app.get("/user")
def get_user(user_data: dict = Depends(verify_jwt)):
    user = fake_users_db.get(user_data["email"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "email": user["email"],
        "full_name": user["full_name"],
        "position": user["position"],
        "role": user["role"],
        "hours_logged": user["hours_logged"]
    }

# Admin-only route


@app.get("/admin")
def admin_route(user_data: dict = Depends(require_role("admin"))):
    return {"message": f"Hello {user_data['email']}, you have admin access!"}

# Employee-specific route to get logged hours


@app.get("/timesheet")
def get_timesheet(user_data: dict = Depends(require_role("employee"))):
    user = fake_users_db.get(user_data["email"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"full_name": user["full_name"], "hours_logged": user["hours_logged"]}
