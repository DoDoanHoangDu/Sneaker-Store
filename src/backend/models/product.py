from sqlalchemy import Column, Integer, String, Float, DateTime, CheckConstraint
from sqlalchemy.orm import relationship
from db.base_class import Base
from .product_category import ProductCategory
from .product_promotion import ProductPromotion
from .product_size import ProductSize


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(256), unique=True)
    img_url = Column(String(256))
    description = Column(String(256))
    brand = Column(String(256))
    discount = Column(Float)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    price = Column(Integer)
    remaining = Column(Integer)

    __table_args__ = (
        CheckConstraint('end_date > start_date', name='check_end_date_after_start_date'),
    )

    category = relationship("ProductCategory", back_populates = "product_link", cascade="all, delete-orphan", lazy="joined")
    promotion = relationship("ProductPromotion", back_populates = "product_link", cascade="all, delete-orphan", lazy="joined")
    size = relationship("ProductSize", back_populates = "product_link", cascade="all, delete-orphan", lazy="joined")


