from pydantic import BaseModel

class OrderHasProductBase(BaseModel):
    pass

class OrderHasProductCreate(OrderHasProductBase):
    order_id : int
    size_id : int
    product_price : int
    quantity : int

class OrderHasProductInDBBase(OrderHasProductCreate):
    pass