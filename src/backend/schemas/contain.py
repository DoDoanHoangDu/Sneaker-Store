from pydantic import BaseModel

class ContainBase(BaseModel):
    pass

class ContainCreate(ContainBase):
    order_id : int
    product_id : int
    quantity : int

class ContainInDBBase(ContainCreate):
    pass