from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.models.order import Order

from backend.api import deps
from backend.models.account import Account
from backend.models.product import Product
from backend.models.order import Order
from backend.models.order_has_product import order_has_product 

from backend.schemas.order import OrderCreate, OrderBase, OrderInDB
from backend.schemas.order_has_product import OrderHasProductCreate

router = APIRouter(prefix="/order")

@router.get("/", response_model= List[OrderCreate])
def get_orders(
    db: Session = Depends(deps.get_db),
    current_account: Account = Depends(deps.get_current_user),
) -> List[OrderCreate]:
    """
    Retrieve orders from current account
    """
    orders = db.query(Order).filter(Order.account_id == current_account.account_id).all()
    if not orders:
        raise HTTPException(status_code=404, detail="No orders found")
    return orders

@router.get("/{order_id}", response_model=OrderCreate)
def get_order(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_account: Account = Depends(deps.get_current_user),
) -> OrderCreate:
    """
    Retrieve a specific order by ID
    """
    order = db.query(Order).filter(Order.order_id == order_id, Order.account_id == current_account.account_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrderBase)
def create_order(
    order: OrderCreate,
    db: Session = Depends(deps.get_db),
) -> OrderInDB:
    """
    Create a new order
    """
    order_data = order.model_dump(exclude_unset=True)
    items = order_data.pop("items")
    print(order_data)
    order = Order(**order_data)
    db.add(order)
    db.commit()
    db.refresh(order)

    for item in items:
        print(item)
        order_has_product_schema = OrderHasProductCreate(
            order_id=order.order_id,
            product_id=item['product_id'],
            quantity=item['quantity']
        )
        order_has_product_instance = order_has_product(**order_has_product_schema.model_dump())
        db.add(order_has_product_instance)
    db.commit()
    
    return order
