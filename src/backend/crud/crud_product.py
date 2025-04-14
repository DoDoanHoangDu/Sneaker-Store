from backend.crud.base import CRUDBase
from backend.models.product import Product
from backend.schemas.product import ProductCreate, ProductUpdate

from sqlalchemy.orm import Session  
from typing import Optional
from fastapi.encoders import jsonable_encoder
from backend.models.product_category import ProductCategory
from backend.models.product_promotion import ProductPromotion
from backend.models.product_size import ProductSize

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get(self, db: Session, id: int) -> Optional[Product]:
        return db.query(self.model).filter(self.model.product_id == id).first()
    def create(self, db: Session, obj_in: ProductCreate) -> Product:
        new_product = Product(
        **{k: v for k, v in obj_in.dict().items() if k not in ["category", "promotion", "size"]},
        category=[ProductCategory(category_name=category) for category in obj_in.category] if obj_in.category else [],
        promotion=[ProductPromotion(promotion_name=promotion) for promotion in obj_in.promotion] if obj_in.promotion else [],
        size=[ProductSize(size=size) for size in obj_in.size] if obj_in.size else [],
        )

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return new_product
    def update(self, id: int, db: Session, obj_in: ProductUpdate):
        update_data = {k: v for k, v in obj_in.dict().items() if k not in ["category", "promotion", "size"]}
        db.query(Product).filter(Product.product_id == id).update(update_data)
        db.flush()

        if "category" in obj_in.dict().keys():
            db.query(ProductCategory).filter(ProductCategory.product_id == id).delete()
            add_categories = [ProductCategory(product_id = id, category_name = category) for category in obj_in.category]
            db.add_all(add_categories)
        if "promotion" in obj_in.dict().keys():
            db.query(ProductPromotion).filter(ProductPromotion.product_id == id).delete()
            add_promotions = [ProductPromotion(product_id = id, promotion_name = promotion) for promotion in obj_in.promotion]
            db.add_all(add_promotions)
        if "size" in obj_in.dict().keys():
            db.query(ProductSize).filter(ProductSize.product_id == id).delete()
            add_sizes = [ProductSize(product_id = id, size = size) for size in obj_in.size]
            db.add_all(add_sizes)
        db.commit()
        return db.query(Product).filter(Product.product_id == id).first()



product = CRUDProduct(Product)