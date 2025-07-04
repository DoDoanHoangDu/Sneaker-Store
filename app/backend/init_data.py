from db.init_db import init_db
from db.session import SessionLocal

def init() -> None:
    db = SessionLocal()
    init_db(db)
    db.close()  

if __name__ == "__main__":
    init()