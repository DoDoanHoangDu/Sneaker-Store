from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os 

env_dir = "../.env"
load_dotenv(dotenv_path=env_dir)

POSTGRES_URL = os.getenv("POSTGRES_URL")


engine = create_engine(POSTGRES_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)