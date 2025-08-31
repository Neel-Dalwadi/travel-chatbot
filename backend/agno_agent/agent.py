from agno.agent import Agent
from agno.tools import tool
from agno.models.openai import OpenAIChat
from agno_agent.tools.destination_tool import destination_tool as suggest_destination
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
    markdown=True,
    show_tool_calls=True,
    tools=[suggest_destination, get_weather, suggest_trip_by_budget],
    add_history_to_messages=True,
    read_chat_history=True
    
)
