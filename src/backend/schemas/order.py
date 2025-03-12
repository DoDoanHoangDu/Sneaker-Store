from pydantic import BaseModel
from datetime import datetime

class OrderBase(BaseModel):
    cart_id : int


class OrderCreate(OrderBase):
    ordered_time : datetime
    delivery_method : str

class OrderInDBBase(OrderCreate):
    order_id : int

