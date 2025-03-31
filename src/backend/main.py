from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.api import api_router

app = FastAPI(title="Product API")


# Allow requests from your React frontend 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust based on frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def root():
    return {"message": "Welcome"}

app.include_router(api_router)
