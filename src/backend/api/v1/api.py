from fastapi import APIRouter

from backend.api.v1.endpoints import product 
from backend.api.v1.endpoints import auth

api_router = APIRouter()
api_router.include_router(product.router, tags=["product"])
api_router.include_router(auth.router, tags=["auth"])
