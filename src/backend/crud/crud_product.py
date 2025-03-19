from crud.base import CRUDBase
from models.product import Product
from schemas.product import ProductCreate, ProductUpdate

from sqlalchemy.orm import Session  
from typing import Optional
from fastapi.encoders import jsonable_encoder
from models.product_category import ProductCategory
from models.product_promotion import ProductPromotion
from models.product_size import ProductSize

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get(self, db: Session, id: int) -> Optional[Product]:
        return db.query(self.model).filter(self.model.product_id == id).first()
    def create(self, db: Session, obj_in: ProductCreate) -> Product:
        product_data = {k: v for k, v in obj_in.dict().items() if k not in ["category", "promotion", "size"]}
        new_product = Product(**product_data)
        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        add_categories = [ProductCategory(product_id = new_product.product_id, category_name = category) for category in obj_in.category]
        add_promotions = [ProductPromotion(product_id = new_product.product_id, promotion_name = promotion) for promotion in obj_in.promotion]
        add_sizes = [ProductSize(product_id = new_product.product_id, size = size) for size in obj_in.size]

        db.add_all(add_categories + add_promotions + add_sizes)
        db.commit()
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
    def delete_product(self, product_id: int, db: Session):
        db.query(Product).filter(Product.product_id == product_id).delete()
        db.query(ProductCategory).filter(ProductCategory.product_id == product_id).delete()
        db.query(ProductPromotion).filter(ProductPromotion.product_id == product_id).delete()
        db.query(ProductSize).filter(ProductSize.product_id == product_id).delete()
        db.commit()
        return {"message": f"Product with product id = {product_id} deleted successfully"}


product = CRUDProduct(Product)