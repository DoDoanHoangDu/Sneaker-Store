from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.base_class import Base

class Cart(Base):
    cart_id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey('account.account_id'))
    product_id = Column(Integer, ForeignKey('product.product_id'))
    quantity = Column(Integer)
    account = relationship("Account", back_populates="cart")
    product = relationship("Product", back_populates="cart")