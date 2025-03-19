from crud.base import CRUDBase
from models.product_size import ProductSize
from schemas.product import ProductCreate, ProductUpdate
from sqlalchemy.orm import Session  
from typing import Optional

class CRUDProductSize(CRUDBase[ProductSize, ProductCreate, ProductUpdate]):
    def get_by_product(self, db: Session, id: int) -> Optional[ProductSize]:
        return db.query(self.model).filter(self.model.product_id == id).first()

size = CRUDProductSize(ProductSize)