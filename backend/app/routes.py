from flask import Blueprint, jsonify
from . import mongo
from bson.json_util import dumps

main = Blueprint('main', __name__)


@main.route('/')
def hello_world():
    # Try to retrieve a document from your MongoDB
    test_collection = mongo.db.test_collection
    document = test_collection.find_one()

    if document:
        # Use dumps from bson.json_util which handles ObjectId types
        document_json = dumps(document)
        return document_json, 200
    else:
        return jsonify({"success": False, "message": "Document not found"}), 404

