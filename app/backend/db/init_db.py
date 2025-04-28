import logging
from sqlalchemy.orm import Session
from backend.crud.account import account
from backend.schemas.account import AccountCreate
from backend.db.base import Base
from backend.db.session import engine
FIRST_USER = 'ducngoquang275@gmail.com'

def init_db(db: Session):
    try: 
        Base.metadata.create_all(bind=engine)
        if FIRST_USER:
            user = account.get_by_email(db=db, email=FIRST_USER)
            if not user:  # Crate pydantic schema -> crud to create orm base on schema
                user_in = AccountCreate(   
                    email=FIRST_USER,
                    password='admin',
                    role='admin'
                )
                account.create(db, user_in)
        db.commit()
    finally: 
        db.close()