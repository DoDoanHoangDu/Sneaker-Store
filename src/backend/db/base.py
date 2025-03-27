# Import all models for sqlalchemy to create tables
from backend.db.base_class import Base  # noqa: F401
from backend.models.account import Account  # noqa: F401
from backend.models.contain import Contain  # noqa: F401
from backend.models.order import Order  # noqa: F401
