from pydantic import BaseModel
from datetime import datetime
from typing import Sequence

class OrderBase(BaseModel):
    pass

# schema to create order
class OrderCreate(OrderBase):
    account_id : int
    ordered_time : datetime
    delivery_method : str

class OrderInDBBase(OrderCreate):
    id : int

class Order(OrderInDBBase):
    pass

class OrderSearchResults(Order):
    
    results = Sequence(Order)