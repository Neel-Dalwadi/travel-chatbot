from agno.tools import tool
import requests 
import os

from dotenv import load_dotenv
load_dotenv()

@tool(name="get_weather", description="Get current weather information for a specified location.")
def weather_tool(location: str) -> str:
    """
    Get current weather information for a specified location.
    
    Args:
        location (str): The name of the location to get the weather for.
        
    Returns:
        str: Current weather information for the specified location.
    """
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        return "Weather API key is not set. Please check your environment variables."
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": location,
        "appid": api_key,
        "units": "metric"
    }
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()

        weather_desc = data["weather"][0]["description"].capitalize()
        temp = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        city = data["name"]
        country = data["sys"]["country"]

        return (f"The current weather in {city}, {country} is {weather_desc} "
                f"with a temperature of {temp}°C (feels like {feels_like}°C).")

    except requests.RequestException as e:
        return f"Error fetching weather data: {str(e)}"
    except KeyError:
        return "Sorry, I couldn't parse the weather data. Please try again later."
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"
