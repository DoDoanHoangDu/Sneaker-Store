from typing import Generator, Optional

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm.session import Session
from jose import JWTError, jwt
from pydantic import BaseModel

from backend.core.auth import oath2_schema
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
        token: str = Depends(oath2_schema),
) :
    
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