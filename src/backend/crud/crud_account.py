from typing import Any, Dict, Optional, Type, Union
from sqlalchemy.orm import Session

from crud.base import CRUDBase
from models.account import Account
from schemas.account import AccountCreate, AccountUpdate   


class CRUDAccount(CRUDBase[Account, AccountCreate, AccountUpdate]):

    def get_by_email(self, db: Session, *, email: str) -> Optional[Account]:
        return db.query(Account).filter(Account.email == email).first()
    
    def update(self, db, *, db_obj, obj_in):
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)