from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class AccountBase(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
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
    id: Optional[int] = None
    class Config:
        from_attributes = True


class AccountInDB(AccountDBBase):
    hashed_password: str
    class Config:
        from_attributes = True

class Account(AccountInDB):
    pass

class AccountUpdate(AccountBase):
    pass

