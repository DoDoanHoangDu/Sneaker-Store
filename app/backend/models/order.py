from sqlalchemy import Column, TIMESTAMP , Integer , ForeignKey , String
from sqlalchemy.orm import relationship
from backend.db.base_class import Base

class Order(Base):
    order_id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey('account.account_id'))
    order_time = Column(TIMESTAMP)
    delivery_method = Column(String)
    product_list = relationship("order_has_product", backref = "order") # order_has_product instance
