from agno.tools import tool

@tool(name="suggest_destination", description="Suggest a travel destination based on user preferences.")
def destination_tool(text:str)->str:
    """
    Suggest a travel destination based on user ask for where to go on for vacation.
    Args:
        text (str): User's request for travel destination.
    Returns:
        str: Suggested travel destination.
        
    """
    text = text.lower()
    if "vacation" in text or "holiday" in text:
        if "beach" in text:
            return "How about visiting the Maldives? It's known for its stunning beaches and crystal-clear waters."
        elif "mountain" in text:
            return "You might enjoy a trip to the Swiss Alps for breathtaking mountain views and skiing."
        elif "city" in text:
            return "Consider exploring Paris, France, with its rich history, art, and culture."
        else:
            return "Could you please specify your interests or preferences for the vacation?"
    else:
        return "Based on your preferences, I suggest visiting Bali, Indonesia. It's a beautiful destination with stunning beaches, rich culture, and plenty of activities to enjoy."
