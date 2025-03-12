from pydantic import BaseModel
from typing import Optional
class ProductBase(BaseModel):
    product_name: str
    brand: str 
    description: str
    discount: float
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
    product_name: Optional[str] = None
    brand: Optional[str] = None
    description: Optional[str] = None
    discount: Optional[float] = None
    price: Optional[float] = None
    remaining: Optional[int] = None
    category: Optional[list[str]] = None
    promotion: Optional[list[str]] = None
    size: Optional[list[int]] = None
    
class ProductInDBBase(ProductBase):
    product_id: int

    class Config:
        orm_mode = True

