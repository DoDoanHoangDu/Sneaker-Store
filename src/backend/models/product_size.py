from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backend.db.base_class import Base

class ProductSize(Base):
    __tablename__ = "product_sizes"

    id = Column(Integer, primary_key=True, index=True)
    size = Column(Integer)
    product_id = Column(Integer, ForeignKey("products.product_id", ondelete="CASCADE")) # Foreign Key linking to Product

    product_link = relationship("Product", back_populates = "size")