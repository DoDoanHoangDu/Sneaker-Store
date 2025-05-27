from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class OrderBase(BaseModel):
    account_id: Optional[int] = None
    customer_name : str
    customer_phone : str
    customer_address : str
    ordered_time : datetime
    delivery_method : str
    total_price : float

class OrderItem(BaseModel):
    size_id : int
    quantity: int


# schema to create order
class OrderCreate(OrderBase):
    items: List[OrderItem]

class OrderInDB(OrderBase):
    id: int