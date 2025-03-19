from crud.base import CRUDBase
from models.product_promotion import ProductPromotion
from schemas.product import ProductCreate, ProductUpdate
from sqlalchemy.orm import Session  
from typing import Optional

class CRUDProductPromotion(CRUDBase[ProductPromotion, ProductCreate, ProductUpdate]):
    def get_by_product(self, db: Session, id: int) -> Optional[ProductPromotion]:
        return db.query(self.model).filter(self.model.product_id == id).first()
    
promotion = CRUDProductPromotion(ProductPromotion)
