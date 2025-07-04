import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()
# Configuration       
cloudinary.config( 
    cloud_name = os.getenv("CLOUD_NAME"), 
    api_key = os.getenv("API_KEY"),
    api_secret = os.getenv("API_SECRET"),
    secure=True
)
