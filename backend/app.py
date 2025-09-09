from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from datetime import timedelta
import json

from routes.chat_routes import chat_blueprint


def check_user(email, password):
    try:
        with open('users.json', 'r') as f:
            users = json.load(f)
        for user in users:
            if user.get('email') == email and user.get('password') == password:
                return user
    except IOError:
        return None
    return None

def create_app():
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = "super-secret-key"
    app.config["JWT_ACCESS_TOKEN_EXPRES"] = timedelta(hours=1)
    jwt = JWTManager(app)

    CORS(
        app,
        resources={r"/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True,
        methods=["POST", "OPTIONS", "GET"],
        allow_headers=["Content-Type", "Authorization"]
    )

    # This line makes the routes in chat_routes.py active.
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
    
    # This route was added because your frontend code calls it
    @app.route("/api/logout", methods=["POST"])
    def logout():
        return jsonify({"message": "Logout successful"}), 200

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)