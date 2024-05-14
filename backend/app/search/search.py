import base64
import logging

from bson import ObjectId

from ..auth.auth import login_required
from flask import Flask, Blueprint, request, jsonify, send_from_directory, session, g, current_app
from ..model.models import *

app = Flask(__name__)
search_bp = Blueprint('search_bp', __name__)


@search_bp.route('/search', methods=['GET'])
#@login_required
def search():
    # parse query
    query = request.args.get('q', '')
    # search in posts
    posts = Post.objects.filter(
        __raw__={'$or':
            [
                {'title': {'$regex': query, '$options': 'i'}},
                {'tags': {'$regex': query, '$options': 'i'}},
                {'content': {'$regex': query, '$options': 'i'}}
            ]
        }
    )
    results = []
    for post in posts:
        # get images from GridFS
        images = []
        for image_id in post.image_ids:
            image = current_app.config['GRIDFS'].get(ObjectId(image_id))
            image_base64 = base64.b64encode(image.read()).decode('utf-8')
            images.append(image_base64)
        likes_count = Like.objects(post=post).count()
        comments_count = Comment.objects(post=post).count()
        post_data = {
            'title': post.title,
            'user': post.user.username,
            'likes': likes_count,
            'comments': comments_count,
            'tags': post.tags,
            'images': images
        }
        results.append(post_data)

    return jsonify(results), 200
