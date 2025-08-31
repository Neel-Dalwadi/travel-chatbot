from agno.tools import tool

@tool(name="suggest_to_trip_plan", description="Suggest a trips within a budget.")
def budget_tool(budget: str) -> str:
    """
    Suggest a trip plan based on the user's budget and destination.
    Args:
        budget (float): The user's budget for the trip.
        destination (str): The destination for the trip.
    Returns:
        str: Suggested trip plan within the budget.
    """
    try :
        amout = float(budget)
        if amout < 10000:
            return "With a budget of less than 10,000, you can consider a short trip to nearby destinations or a weekend getaway. How about exploring local attractions or a nearby city?"
        elif 10000 <= amout < 50000:
            return "For a budget between 10,000 and 50,000, you can plan a more extended trip to a nearby country or a domestic destination. Consider visiting popular tourist spots or cultural sites."
        elif 50000 <= amout < 90000:
            return "With a budget between 50,000 and 90,000, you can plan a comfortable trip to a popular tourist destination, including flights, accommodation, and activities."
        else:
            return "With a budget of more than 90,000, you can plan an extravagant trip to a luxury destination, including first-class flights, high-end accommodation, and exclusive experiences."

    except ValueError:
        return "Please provide a valid budget amount in numbers."
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"