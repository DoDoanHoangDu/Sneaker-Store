from sqlalchemy import Column, TIMESTAMP , Integer , ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base

class Order(Base):
    order_id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey('cart.cart_id'))
    order_time = Column(TIMESTAMP)
    cart = relationship("Cart", back_populates='order')