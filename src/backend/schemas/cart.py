from pydantic import BaseModel, HttpUrl

class CartBase(BaseModel):
    user_id: int

class CartCreate(CartBase):
    product_id: int
    quantity: int

# schema for cart in database
class CartInDBBase(CartCreate):
    cart_id: int

    class Config:
        orm_mode = True