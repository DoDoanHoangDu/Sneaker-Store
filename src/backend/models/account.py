from sqlalchemy import Column , Integer ,String , DATE , ForeignKey
from sqlalchemy.orm import relationship
from backend.db.base_class import Base

class Account(Base):
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(256), unique=True, index=True)
    password = Column(String(256))
    full_name = Column(String(256)) 
    dob = Column(DATE)
    role = Column(String(256))
    phone_number = Column(String(256))
    address = Column(String(256))
    sex = Column(String(256))
    email =  Column(String(256))
    orders = relationship("Order", backref = "account")
