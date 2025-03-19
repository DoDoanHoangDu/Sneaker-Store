from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# Get database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

# Create a SessionLocal class (to interact with the database)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
