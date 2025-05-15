from backend.db.session import SessionLocal
from typing import Generator, Optional

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm.session import Session
from jose import JWTError, jwt
from pydantic import BaseModel

from backend.core.auth import oauth2_schema
from backend.models.account import Account
from backend.db.session import SessionLocal

class TokenData(BaseModel):
    username: Optional[str] = None

# Get DB session
def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_current_user(
        db: Session = Depends(get_db),
        token: str = Depends(oauth2_schema),
) -> Account :
    
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials",
        headers = {"WWW-Authenticate": "Bearer"},
    )

    try :
        payload = jwt.decode(token, "TEST_SECRET",
                              algorithms=["HS256"],
                              options={"verify_aud": False})
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    account = db.query(Account).filter(Account.account_id == token_data.username).first()
    if account is None:
        raise credentials_exception 
    return account


async def get_current_active_Admin_user(
        current_user: Account = Depends(get_current_user),
) -> Account:
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The user doesn't have enough privileges",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return current_user