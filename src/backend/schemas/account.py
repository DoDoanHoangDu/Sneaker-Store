from pydantic import BaseModel, EmailStr

from typing import Optional

class AccountBase(BaseModel):
    username: Optional[str]
    password: Optional[str]
    full_name: Optional[str]
    dob: Optional[str]
    phone_number: Optional[str]
    address: Optional[str]
    email: Optional[EmailStr] = None
    role: str = 'customer'

# Schema to create a new account
class AccountCreate(AccountBase):
    email : EmailStr
    role : str


# Schema define account in database
class AccountINDBBase(AccountCreate):
    id: Optional[int] = None
    class Config:
        from_attributes = True


class AccountUpdate(AccountBase):
    pass

