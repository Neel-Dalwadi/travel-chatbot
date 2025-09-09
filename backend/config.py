import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

class Config:
    
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    

