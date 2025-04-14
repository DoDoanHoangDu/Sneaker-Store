# Import all models for sqlalchemy to create tables
from backend.db.base_class import Base  # noqa: F401
from backend.models.account import Account  # noqa: F401
from backend.models.order_has_product import Contain  # noqa: F401
from backend.models.order import Order  # noqa: F401
from backend.models.product import Product  # noqa: F401
from backend.models.product_size import ProductSize  # noqa: F401
