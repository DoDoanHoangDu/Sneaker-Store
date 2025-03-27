from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base

class Contain(Base):
    order_id = Column(Integer, ForeignKey('order.order_id'), primary_key=True)
    product_id = Column(Integer, ForeignKey('product.product_id'), primary_key=True)
    quantity = Column(Integer)
