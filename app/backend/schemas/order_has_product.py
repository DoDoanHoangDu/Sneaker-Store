from pydantic import BaseModel

class OrderHasProductBase(BaseModel):
    pass

class OrderHasProductCreate(OrderHasProductBase):
    order_id : int
    size_id : int
    quantity : int

class OrderHasProductInDBBase(OrderHasProductCreate):
    pass