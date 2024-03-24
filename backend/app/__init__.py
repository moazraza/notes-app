from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

mongo = None


def create_app():
    global mongo
    app = Flask(__name__)
    load_dotenv()
    app.config['MONGO_URI'] = os.environ.get("MONGO_URI")
    mongo = PyMongo(app)

    with app.app_context():
        # Import parts of our application
        from .routes import main
        app.register_blueprint(main)

    return app
