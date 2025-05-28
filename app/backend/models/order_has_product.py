from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.db.base_class import Base

class order_has_product(Base):



    order_id = Column(Integer, ForeignKey('order.order_id'), primary_key=True)
    size_id = Column(Integer, ForeignKey('product_sizes.id'), primary_key=True)
    quantity = Column(Integer)

    orders = relationship("Order", back_populates="product_list")