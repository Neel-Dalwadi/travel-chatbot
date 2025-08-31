from flask import Flask
from flask_cors import CORS
from routes.chat_routes import chat_blueprint
from utils.error_handler import register_error_handlers
allowed_origins = ["http://localhost:5173"]


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})

    app.register_blueprint(chat_blueprint)
    register_error_handlers(app)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True,use_reloader=True)
