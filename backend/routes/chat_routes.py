from flask import Blueprint, request, jsonify, session
from services.chat_service import process_user_message
from flask_cors import CORS, cross_origin
from agno_agent.tools.destination_tool import handle_user_message

chat_blueprint = Blueprint('chat', __name__)
CORS(chat_blueprint, origins=["http://localhost:5173"], supports_credentials=True)


@chat_blueprint.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def login():
    return {"message": "Login working!"}


@chat_blueprint.route("/api/auth/logout", methods=["POST"])
def logout():
    return jsonify({"message": "Logout successful"}), 200

@chat_blueprint.route("/api/travel-info", methods=["GET"])
def get_travel_info():
    location = request.args.get("location")
    if not location:
        return jsonify({"error": "Location is required"}), 400
    data = handle_user_message(location)
    return jsonify(data)


@chat_blueprint.route('/api/chat', methods=['POST'])
def chat():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        if data is None:
            return jsonify({"error": "Invalid JSON data"}), 400

        message = data.get("message", "").strip()
        if not message:
            return jsonify({"error": "Message is required"}), 400

        response = process_user_message(message)

        return jsonify({"response": response}), 200

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
