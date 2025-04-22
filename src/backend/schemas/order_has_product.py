from pydantic import BaseModel

class order_has_productBase(BaseModel):
    pass

class order_has_productCreate(order_has_productBase):
    order_id : int
    product_id : int
    quantity : int

class order_has_productInDBBase(order_has_productCreate):
    pass