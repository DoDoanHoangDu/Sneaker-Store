from db.session import SessionLocal

# Get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()