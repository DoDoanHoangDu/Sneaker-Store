from pydantic import BaseModel
from typing import Optional
from datetime import datetime
class ProductBase(BaseModel):
    img_url: Optional[str]
    product_name: str
    brand: str 
    description: str
    discount: Optional[float] = 0.0
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    price: float
    remaining: int
    category: list[str]
    promotion: list[str]
    size: list[int]

class ProductCreate(ProductBase):
    pass
    
class ProductResponse(ProductBase):
    product_id: int

class ProductUpdate(ProductBase):
    img_url: Optional[str] = None
    product_name: Optional[str] = None
    brand: Optional[str] = None
    description: Optional[str] = None
    discount: Optional[float] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    price: Optional[float] = None
    remaining: Optional[int] = None
    category: Optional[list[str]] = None
    promotion: Optional[list[str]] = None
    size: Optional[list[int]] = None


class ProductFilter(BaseModel):
    product_name: Optional[str] = None
    brand: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    category: Optional[list[str]] = None
    promotion: Optional[list[str]] = None
    size: Optional[list[int]] = None
    
class ProductInDBBase(ProductBase):
    product_id: int

    class Config:
        orm_mode = True

