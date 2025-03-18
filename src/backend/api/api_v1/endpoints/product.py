from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session, joinedload
from db.base_class import Base
from db.session import get_db, engine
from models.product import Product, ProductCategory, ProductPromotion, ProductSize
from schemas.product import ProductCreate, ProductUpdate
from typing import Optional
from datetime import datetime


router = APIRouter()

# Create database tables
Base.metadata.create_all(bind=engine)


@router.get("/product/id/{product_id}")
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    result = db.query(Product).options(joinedload(Product.category).load_only(ProductCategory.category_name), joinedload(Product.promotion).load_only(ProductPromotion.promotion_name), joinedload(Product.size).load_only(ProductSize.size)).filter(Product.product_id == product_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Product not found")
    return result

@router.get("/product/search")
def get_product_general(
    db: Session = Depends(get_db),
    product_name: Optional[str] = None,
    brand: Optional[str] = None,
    price_min: Optional[float] = None,
    price_max: Optional[float] = None,
    discount_min: Optional[float] = None,
    category: Optional[list[str]] = Query(None),
    promotion: Optional[list[str]] = Query(None),
    size: Optional[list[int]] = Query(None),
    exactly: Optional[bool] = False,
):
    query = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.promotion),
        joinedload(Product.size),
    )

    if product_name:
        if exactly:
            query = query.filter(Product.product_name == product_name)
        else:
            query = query.filter(Product.product_name.ilike(f"%{product_name}%"))
    if brand:
        query = query.filter(Product.brand.ilike(f"%{brand}%"))
    if price_min is not None:
        query = query.filter(Product.price >= price_min)
    if price_max is not None:
        query = query.filter(Product.price <= price_max)
    if discount_min is not None:
        query = query.filter(Product.discount >= discount_min).filter(Product.start_date <= datetime.now()).filter(Product.end_date >= datetime.now())

    # Filtering many-to-many relationships
    if category:
        query = query.filter(Product.category.any(ProductCategory.category_name.in_(category)))
    if promotion:
        query = query.filter(Product.promotion.any(ProductPromotion.promotion_name.in_(promotion)))
    if size:
        query = query.filter(Product.size.any(ProductSize.size.in_(size)))
    if not query.all():
        raise HTTPException(status_code=404, detail="No product found")
    return query.all()
@router.post("/product")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    product_data = {k: v for k, v in product.dict().items() if k not in ["category", "promotion", "size"]}
    new_product = Product(**product_data)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    add_categories = [ProductCategory(product_id = new_product.product_id, category_name = category) for category in product.category]
    add_promotions = [ProductPromotion(product_id = new_product.product_id, promotion_name = promotion) for promotion in product.promotion]
    add_sizes = [ProductSize(product_id = new_product.product_id, size = size) for size in product.size]

    db.add_all(add_categories + add_promotions + add_sizes)
    db.commit()
    return {"message": "Product created successfully with product_id: " + str(new_product.product_id)}

@router.put("/product/{product_id}")
def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    update_data = {k: v for k, v in product.dict().items() if k not in ["category", "promotion", "size"]}
    db.query(Product).filter(Product.product_id == product_id).update(update_data)
    db.flush()

    if "category" in product.dict().keys():
        db.query(ProductCategory).filter(ProductCategory.product_id == product_id).delete()
        add_categories = [ProductCategory(product_id = product_id, category_name = category) for category in product.category]
        db.add_all(add_categories)
    if "promotion" in product.dict().keys():
        db.query(ProductPromotion).filter(ProductPromotion.product_id == product_id).delete()
        add_promotions = [ProductPromotion(product_id = product_id, promotion_name = promotion) for promotion in product.promotion]
        db.add_all(add_promotions)
    if "size" in product.dict().keys():
        db.query(ProductSize).filter(ProductSize.product_id == product_id).delete()
        add_sizes = [ProductSize(product_id = product_id, size = size) for size in product.size]
        db.add_all(add_sizes)
    db.commit()
    return db.query(Product).options(joinedload(Product.category).load_only(ProductCategory.category_name), joinedload(Product.promotion).load_only(ProductPromotion.promotion_name), joinedload(Product.size).load_only(ProductSize.size)).filter(Product.product_id == product_id).first()

@router.delete("/product/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db.query(Product).filter(Product.product_id == product_id).delete()
    db.query(ProductCategory).filter(ProductCategory.product_id == product_id).delete()
    db.query(ProductPromotion).filter(ProductPromotion.product_id == product_id).delete()
    db.query(ProductSize).filter(ProductSize.product_id == product_id).delete()
    db.commit()
    return {"message": f"Product with product id = {product_id} deleted successfully"}
