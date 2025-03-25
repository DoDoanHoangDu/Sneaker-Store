from fastapi import APIRouter, Depends, Query, HTTPException, File, UploadFile
from cloud.cloudinary_config import cloudinary
import re
from sqlalchemy.orm import Session, joinedload
import crud.crud_product
from db.base_class import Base
from db.session import engine
from api.deps import get_db
import crud
from models.product import Product, ProductCategory, ProductPromotion, ProductSize
from schemas.product import ProductCreate, ProductUpdate
from typing import Optional
from datetime import datetime



router = APIRouter()

# Create database tables
Base.metadata.create_all(bind=engine)


@router.get("/product/id/{product_id}")
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    main_result = crud.crud_product.product.get(db = db, id = product_id)
    if not main_result:
        raise HTTPException(status_code=404, detail="Product not found")
    result = main_result.__dict__
    result["category"] = [cat.category_name for cat in main_result.category if cat.product_id == product_id]
    result["promotion"] = [promo.promotion_name for promo in main_result.promotion if promo.product_id == product_id]
    result["size"] = [s.size for s in main_result.size if s.product_id == product_id]

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
    
    result = query.all()
    if not result:
        raise HTTPException(status_code=404, detail="No product found")
    return [
        {
        **product.__dict__,
        "category": [cat.category_name for cat in product.category if cat.product_id == product.product_id],
        "promotion": [promo.promotion_name for promo in product.promotion if promo.product_id == product.product_id],
        "size": [size.size for size in product.size if size.product_id == product.product_id],
        } for product in result
    ]

@router.post("/upload-image")
def upload_image(image: UploadFile = File(...)):
    try:
        upload_result = cloudinary.uploader.upload(image.file)
        return {"img_url": upload_result["secure_url"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

@router.post("/product")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    main_part = crud.crud_product.product.create(db=db, obj_in=product)
    if not main_part:
        raise HTTPException(status_code=409, detail="Product already exists")
    return { "message" : "Product created successfully" }

@router.put("/product/{product_id}")
def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    main_part = crud.crud_product.product.get(db = db, id = product_id)
    if not main_part:
        raise HTTPException(status_code=404, detail="Product not found")
    crud.crud_product.product.update(id = product_id, db = db, obj_in = product)


    return { "message" : "Product updated successfully" }

@router.delete("/delete-image")
def delete_cloudinary_image(image_url: str):
    try:
        public_id = image_url.split("/")[-1].split(".")[0]

        # Delete the image from Cloudinary
        result = cloudinary.uploader.destroy(public_id)

        if result.get("result") == "ok":
            return {"message": "Image deleted successfully"}
        else:
            raise HTTPException(status_code=400, detail="Failed to delete image")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.delete("/product/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    main_part = crud.crud_product.product.get(db = db, id = product_id)
    if not main_part:
        raise HTTPException(status_code=404, detail="Product not found")
    crud.crud_product.product.remove(db = db, id = product_id)
    return { "message" : "Product deleted successfully" }
