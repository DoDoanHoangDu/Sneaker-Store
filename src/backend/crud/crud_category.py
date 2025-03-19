from crud.base import CRUDBase
from models.product_category import ProductCategory
from schemas.product import ProductCreate, ProductUpdate
from sqlalchemy.orm import Session  
from typing import Optional

class CRUDProductCategory(CRUDBase[ProductCategory, ProductCreate, ProductUpdate]):
    def get_by_product(self, db: Session, product_id: int) -> Optional[ProductCategory]:
        return db.query(self.model).filter(self.model.product_id == product_id).first()

category = CRUDProductCategory(ProductCategory)