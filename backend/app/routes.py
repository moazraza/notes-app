from flask import Blueprint, jsonify

main = Blueprint('main', __name__)


# define main route which returns the API usage for user and post
@main.route('/')
def root():
    usage_info = {
        "message": "API Usage",
        "routes": {
            "get_user": {
                "method": "GET",
                "description": "Retrieves user information",
                "example": "/get_user"
            },
            "get_post": {
                "method": "GET",
                "description": "Retrieves all posts",
                "example": "/get_post"
            }
        }
    }
    return jsonify(usage_info), 200
