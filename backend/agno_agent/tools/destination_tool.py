from agno.agent import Agent
from agno.tools.tavily import TavilyTools
import os
import re
from dotenv import load_dotenv
load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

agent = Agent(
    tools=[TavilyTools(search=True)],
    show_tool_calls=True
)

def extract_location(user_message: str) -> str:
    """
    Try to extract a location from the user message.
    Examples:
        "I want to go in Paris" -> "Paris"
        "Tell me about Switzerland" -> "Switzerland"
    """
    match = re.search(r"(?:in|at|to)\s+([a-zA-Z\s]+)", user_message, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return user_message.strip()  

def handle_user_message(user_message: str) -> str:
    """
    Main chatbot logic for your Travel Chatbot project.
    Returns top destinations + hotels for a given location.
    """
    location = extract_location(user_message)
    prompt = f"""
    You are a helpful travel assistant.
    The user wants to travel to: {location}.
    
    Provide:
    1. Top 3 destinations or attractions in {location}.
    2. Top 3 hotels for accommodation (with a short description).
    
    Format clearly in a numbered list.
    """

    return agent.run(prompt)


