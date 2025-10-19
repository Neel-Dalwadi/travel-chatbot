from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from datetime import timedelta
import json

from routes.chat_routes import chat_blueprint

def load_users():
    """Load users from the JSON file."""
    try:
        with open("users.json", "r") as f:
            users = json.load(f)
        return users
    except FileNotFoundError:
        return []

def check_user(email, password):
    """Check if the email and password match any user."""
    users = load_users()
    for user in users:
        if user.get("email") == email and user.get("password") == password:
            return user
    return None

def create_app():
    app = Flask(__name__)


    app.config["JWT_SECRET_KEY"] = "super-secret-key"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

    jwt = JWTManager(app)

    
    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True
    )

    
    app.register_blueprint(chat_blueprint)

    
    @app.route("/api/login", methods=["POST"])
    def login():
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = check_user(email, password)
        if user:
            token = create_access_token(identity=email)
            return jsonify({
                "message": "Login successful",
                "user": {"email": email},
                "token": token
            })
        else:
            return jsonify({"message": "Invalid credentials"}), 401

    
    @app.route("/api/logout", methods=["POST"])
    def logout():
        return jsonify({"message": "Logout successful"}), 200

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
