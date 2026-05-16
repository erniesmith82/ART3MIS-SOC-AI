from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext


SECRET_KEY = "change-this-secret-key-before-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def clean_password(password: str) -> str:
    return password[:72]


def hash_password(password: str) -> str:
    return pwd_context.hash(clean_password(password))


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(clean_password(plain_password), hashed_password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def decode_access_token(token: str):
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
    except JWTError:
        return None


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token."
        )

    username = payload.get("sub")

    if username is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token payload."
        )

    return {
        "username": username
    }