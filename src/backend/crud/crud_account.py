from typing import Any, Dict, Optional, Type, Union
from sqlalchemy.orm import Session

from backend.crud.base import CRUDBase
from backend.models.account import Account
from backend.schemas.account import AccountCreate, AccountUpdate   
from backend.core.security import get_password_hash

class CRUDAccount(CRUDBase[Account, AccountCreate, AccountUpdate]):

    def get_by_email(self, db: Session, *, email: str) -> Optional[Account]:
        return db.query(Account).filter(Account.email == email).first()
    
    def create(self, db, obj_in : AccountCreate) -> Account:
        create_data = obj_in.model_dump(exclude_unset=True)
        create_data.pop("password")
        db_obj = Account(**create_data)
        db_obj.hashed_password = get_password_hash(obj_in.password)
        db.add(db_obj)
        db.commit()
        return db_obj
    
    def update(self, db, *, db_obj, obj_in):
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)
    
account = CRUDAccount(Account)