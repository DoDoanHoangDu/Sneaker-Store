from pydantic import BaseModel, HttpUrl

from typing import Optional

class AccountBase(BaseModel):
    email: str


# Schema to create a new account
class AccountCreate(AccountBase):
    username: str
    password: str
    full_name: str
    dob: str
    role: str
    phone_number: str
    address: str


# Schema define account in database
class AccountINDBBase(AccountCreate):
    id: int
    class Config:
        orm_mode = True