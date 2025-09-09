import json

def load_users():
    """Load users from the JSON file."""
    with open("users.json", "r") as f:
        users = json.load(f)
    return users

def check_user(email, password):
    """Check if the email and password match any user."""
    users = load_users()
    user = next((u for u in users if u["email"] == email and u["password"] == password), None)
    return user
