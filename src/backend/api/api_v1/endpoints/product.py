from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session, joinedload
from db.base_class import Base
from db.session import get_db, engine
from models.product import Product, ProductCategory, ProductPromotion, ProductSize
from schemas.product import ProductCreate, ProductUpdate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Allow requests from your React frontend 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust based on frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/product/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):

    return db.query(Product).options(joinedload(Product.category), joinedload(Product.promotion), joinedload(Product.size)).filter(Product.product_id == product_id).first()

@app.post("/product")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    product_data = {k: v for k, v in product.dict().items() if k not in ["category", "promotion", "size"]}
    new_product = Product(**product_data)
    db.add(new_product)
    #db.commit()
    #db.refresh(new_product)

    add_categories = [ProductCategory(product_id = new_product.product_id, category_name = category) for category in product.category]
    add_promotions = [ProductPromotion(product_id = new_product.product_id, promotion_name = promotion) for promotion in product.promotion]
    add_sizes = [ProductSize(product_id = new_product.product_id, size = size) for size in product.size]

    db.add_all(add_categories + add_promotions + add_sizes)
    db.commit()
    return {"message": "Product created successfully with product_id: " + str(new_product.product_id)}

@app.put("/product/{product_id}")
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
    return db.query(Product).options(joinedload(Product.category), joinedload(Product.promotion), joinedload(Product.size)).filter(Product.product_id == product_id).first()

@app.delete("/product/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db.query(Product).filter(Product.product_id == product_id).delete()
    db.query(ProductCategory).filter(ProductCategory.product_id == product_id).delete()
    db.query(ProductPromotion).filter(ProductPromotion.product_id == product_id).delete()
    db.query(ProductSize).filter(ProductSize.product_id == product_id).delete()
    db.commit()
    return {"message": "Product deleted successfully"}
