from sqlalchemy import Column, TIMESTAMP , Integer , ForeignKey , String, Float
from sqlalchemy.orm import relationship
from backend.db.base_class import Base

class Order(Base):
    order_id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("account.account_id"), nullable= True)
    total_price = Column(Float)
    customer_name = Column(String)
    customer_phone = Column(String)
    customer_address = Column(String)
    ordered_time = Column(TIMESTAMP)
    delivery_method = Column(String)
    items = relationship("order_has_product", backref = "order") # order_has_product instance
