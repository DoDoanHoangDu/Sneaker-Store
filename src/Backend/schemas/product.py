from pydantic import BaseModel
from typing import Optional
class ProductBase(BaseModel):
    product_name: str
    brand: str
    price: float
    discount: float
    status: str
    item_sold: int
    remaining_stock: int
    review_score: float
    review_count: int
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
    price: Optional[float] = None
    discount: Optional[float] = None
    status: Optional[str] = None
    item_sold: Optional[int] = None
    remaining_stock: Optional[int] = None
    review_score: Optional[float] = None
    review_count: Optional[int] = None
    category: Optional[list[str]] = None
    promotion: Optional[list[str]] = None
    size: Optional[list[int]] = None
    
class ProductInDBBase(ProductBase):
    product_id: int

    class Config:
        orm_mode = True

