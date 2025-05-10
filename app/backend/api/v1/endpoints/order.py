from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.models.order import Order

from backend.api import deps
from backend.models.account import Account
from backend.models.product import Product
from backend.models.order import Order
from backend.models.order_has_product import order_has_product as OrderHasProduct

from backend.schemas.order import OrderCreate
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

@router.post("/", response_model=OrderCreate)
def create_order(
    order_has_products : List[OrderHasProductCreate],
    db: Session = Depends(deps.get_db),
    current_account: Account = Depends(deps.get_current_user),
) -> OrderCreate:
    """
    Create a new order for the current account
    """
    order = Order(account_id=current_account.account_id)
    db.add(order)
    db.commit()
    db.refresh(order)
    for order_has_product in order_has_products:
        product = db.query(Product).filter(Product.product_id == order_has_product.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        if product.remaining < order_has_product.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock for product")
        product.remaining -= order_has_product.quantity
        db.add(product)

        order_has_product = OrderHasProduct(**order_has_product.model_dump(), order_id=order.order_id)
        db.add(order_has_product)
    db.commit()
    db.refresh(order)
    return order   

