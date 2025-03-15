from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base

class ProductCategory(Base):
    __tablename__ = "product_categories"

    id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(256))
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE")) # Foreign Key linking to Product

    product_link = relationship("Product", back_populates = "category")