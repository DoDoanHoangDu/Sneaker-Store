import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()
# Configuration       
cloudinary.config( 
    cloud_name = "dddsn07b9", 
    api_key = os.getenv("api_key"),
    api_secret = os.getenv("api_secret"),
    secure=True
)
