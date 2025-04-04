from typing import Optional, MutableMapping, List, Union
from datetime import timedelta, datetime

from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import jwt

from backend.models.account import Account
from backend.core.security import verify_password

JWTPayloadMapping = MutableMapping[
    str, Union[datetime, bool, str, List[str], List[int]]
]

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def authenticate(*, db: Session, email: str, password: str) -> Optional[Account]:
    
    account = db.query(Account).filter(Account.email == email).first()
    if not account:
        return None
    if not verify_password(password, account.hashed_password):
        return None
    return account

def create_access_token(*, sub: str) -> str:
    return _create_token(
        token_type="access_token",
        lifetime=timedelta(minutes=60 * 24 * 8),
        sub=sub,
    )


def _create_token(
    token_type: str,
    lifetime: timedelta,
    sub: str,
) -> str:
    payload = {}
    expire = datetime.now() + lifetime
    payload["type"] = token_type

    # https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
    # The "exp" (expiration time) claim identifies the expiration time on
    # or after which the JWT MUST NOT be accepted for processing
    payload["exp"] = expire

    # The "iat" (issued at) claim identifies the time at which the
    # JWT was issued.
    payload["iat"] = datetime.now()

    # The "sub" (subject) claim identifies the principal that is the
    # subject of the JWT
    payload["sub"] = str(sub)
    return jwt.encode(payload, key="TEST_SECRET", algorithm="HS256")