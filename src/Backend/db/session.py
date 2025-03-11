from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Format: postgresql://<username>:<password>@<host>:<port>/<database>
DATABASE_URL = "postgresql://postgres:huy0913362137@localhost:5432/test"

engine = create_engine(DATABASE_URL, echo=True)

# Create a SessionLocal class (to interact with the database)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()