from fastapi import APIRouter

from api.v1.endpoints import product 

api_router = APIRouter()
api_router.include_router(product.router, tags=["product"])
api_router.include_router(auth.router, tags=["auth"])
