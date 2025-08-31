from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client["travel_chatbot"]
chat_collection = db["chats"]

def save_chat(user_input: str, bot_response: str) -> None:
    """
    Store the chat conversation in MongoDB.
    """
    chat_collection.insert_one({
        "user_input": user_input,
        "bot_response": bot_response
    })
