from agno.agent import Agent
from agno.tools import tool
from agno.models.openai import OpenAIChat
from agno_agent.tools.destination_tool import handle_user_message
from agno_agent.tools.weather_tool import weather_tool as get_weather   
from agno_agent.tools.budget_tool import budget_tool as suggest_trip_by_budget
from dotenv import load_dotenv
import os
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

agent = Agent(
    name="TravelAgent",
    description="An agent to assist with travel planning and suggestions.",
    model= OpenAIChat(
        id='gpt-4.1-mini',
        temperature=0.0,
    ),
    instructions = """
        You are a helpful AI travel planning assistant. 
        Your role is to assist users in planning their trips by:

        1. Recommending destinations based on preferences (e.g., beaches, mountains, cities, culture, adventure).
        2. Providing up-to-date weather information for chosen locations.
        3. Suggesting budget-friendly options (flights, hotels, activities) based on user constraints.
        4. Offering travel tips, itineraries, and must-visit attractions.
        5. Answering general travel-related questions in a friendly and professional manner.

        Always be concise, clear, and user-friendly.
        If you don’t know the answer, suggest reliable ways the user can find it.
        """,
    markdown=True,
    show_tool_calls=True,
    tools=[handle_user_message, get_weather, suggest_trip_by_budget],
    add_history_to_messages=True,
    read_chat_history=True
)
