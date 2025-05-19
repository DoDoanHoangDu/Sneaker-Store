from typing import Any, Dict, Optional, Type, Union
from sqlalchemy.orm import Session

from backend.crud.base import CRUDBase
from backend.models.account import Account
from backend.schemas.account import AccountCreate, AccountUpdateMe, AccountUpdateAdmin
from backend.core.security import get_password_hash

class CRUDAccount(CRUDBase[Account, AccountCreate, AccountUpdateMe]):

    def get_by_username(self, db: Session, *, username: str) -> Optional[Account]:
        return db.query(Account).filter(Account.username == username).first()
    
    def create(self, db, obj_in : AccountCreate) -> Account:
        create_data = obj_in.model_dump(exclude_unset=True)
        create_data.pop("password")
        db_obj = Account(**create_data)
        db_obj.hashed_password = get_password_hash(obj_in.password)
        db.add(db_obj)
        db.commit()
        return db_obj
    
    def update(self, db : Session, *, obj_in : AccountUpdateMe, current_account : Account):
        update_data = obj_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(current_account, key, value)
        db.add(current_account)
        db.commit()
        db.refresh(current_account)
        return current_account
account = CRUDAccount(Account)