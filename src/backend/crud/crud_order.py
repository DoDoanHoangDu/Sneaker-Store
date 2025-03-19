from crud.base import CRUDBase
from models.order import Order
from schemas.order import OrderCreate, OrderUpdate
from sqlalchemy.orm import Session
from typing import Any, Dict, Optional, Type, Union 

class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):

    def get_by_account_id(self, db: Session, *, account_id: int) -> Optional[Order]:
        return db.query(Order).filter(Order.account_id == account_id).first()

    def update(self, db, *, db_obj, obj_in):
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=obj_in)