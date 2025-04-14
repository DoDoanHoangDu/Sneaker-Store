from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pathlib import Path
import os 


BASE_PATH = Path(__file__).resolve().parent

env_dir = os.path.join(BASE_PATH, ".env")

load_dotenv(dotenv_path=env_dir)

POSTGRES_URL = os.getenv("POSTGRES_URL")


engine = create_engine(POSTGRES_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
