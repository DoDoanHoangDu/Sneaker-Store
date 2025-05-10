from fastapi import APIRouter

from backend.api.v1.endpoints import product 
from backend.api.v1.endpoints import auth
from backend.api.v1.endpoints import order

api_router = APIRouter()
api_router.include_router(product.router, tags=["product"])
api_router.include_router(auth.router, tags=["auth"])

api_router.include_router(order.router, tags=["order"])