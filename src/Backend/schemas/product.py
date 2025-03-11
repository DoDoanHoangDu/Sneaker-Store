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
    
class ProductResponse(ProductBase):
    product_id: int

class ProductUpdate(ProductBase):
    product_name: Optional[str]
    brand: Optional[str]
    price: Optional[float]
    discount: Optional[float]
    status: Optional[str]
    item_sold: Optional[int]
    remaining_stock: Optional[int]
    review_score: Optional[float]
    review_count: Optional[int]
    category: Optional[list[str]]
    promotion: Optional[list[str]]
    size: Optional[list[int]]

