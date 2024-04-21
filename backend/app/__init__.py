import logging
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
from mongoengine import connect
from flask_cors import CORS

# mongo = None


def create_app():
    # global mongo
    app = Flask(__name__)
    CORS(app)
    logging.basicConfig(level=logging.DEBUG)
    load_dotenv()
    app.config['MONGO_URI'] = os.environ.get("MONGO_URI")
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['WTF_CSRF_ENABLED'] = False
    # mongo = PyMongo(app)
    mongo_db = connect('notes', host=app.config['MONGO_URI'])
    with app.app_context():
        # Import routes of our application
        from .routes import main
        from .user.user import user_db
        from .auth.auth import auth_db
        from .post.post import post_db
        app.register_blueprint(main)
        app.register_blueprint(user_db)
        app.register_blueprint(auth_db)
        app.register_blueprint(post_db)
    return app
