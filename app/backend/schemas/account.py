from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class AccountBase(BaseModel):
    username: Optional[str] = None
    full_name: Optional[str] = None
    dob: Optional[datetime] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    email: Optional[EmailStr] = None
    role: str = 'customer'

# Schema to create a new account
class AccountCreate(AccountBase):
    email : EmailStr
    password : str
    role : str


# Schema define account in database
class AccountDBBase(AccountBase):
    account_id: Optional[int] = None
    class Config:
        from_attributes = True


class AccountInDB(AccountDBBase):
    hashed_password: str
    class Config:
        from_attributes = True

class Account(AccountInDB):
    sex : Optional[str] = None
    pass

class AccountUpdate(BaseModel):
    full_name: Optional[str] = None
    dob: Optional[datetime] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    sex : Optional[str] = None

