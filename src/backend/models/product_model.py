from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from db.base_class import Base
from .product_category_model import ProductCategory
from .product_promotion_model import ProductPromotion
from .product_size_model import ProductSize

class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(256), unique=True)
    description = Column(String(256))
    brand = Column(String(256))
    discount = Column(Float)
    price = Column(Integer)
    remaining = Column(Integer)


    category = relationship("ProductCategory", back_populates = "product_link", cascade="all, delete-orphan")
    promotion = relationship("ProductPromotion", back_populates = "product_link", cascade="all, delete-orphan")
    size = relationship("ProductSize", back_populates = "product_link", cascade="all, delete-orphan")


