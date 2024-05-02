from bson import ObjectId
from flask import Flask, Blueprint, jsonify, request, g

from app.model.models import Bookmark, User, Post
from app.post.forms import BookmarkForm

app = Flask(__name__)
bookmark_db = Blueprint('bookmark_db', __name__)


@bookmark_db.route('/bookmarks', methods=['POST'])
def create_bookmark():
    if request.method == 'POST':
        form = BookmarkForm(request.form)
        if form.validate():
            post_id = form.post_id.data
            user = g.user_id
            user = User.objects(id=ObjectId(user)).first()
            if not user:
                return jsonify({'message': 'user not exist'}), 404
            post = Post.objects(id=ObjectId(post_id)).first()
            if not post:
                return jsonify({'message': 'post not exist'}), 404
            bookmark = Bookmark(
                user=user,
                post=post
            )
            bookmark.save()
            return jsonify({'message': 'success'}), 201
        else:
            return jsonify({'message': 'failed', 'errors': form.errors}), 400


@bookmark_db.route('/bookmarks', methods=['GET'])
def get_bookmarks():
    try:
        bookmarks = Bookmark.objects(user=ObjectId(g.user_id))
        bookmarks_data = []
        for bookmark in bookmarks:
            bookmarks_data.append({
                'id': str(bookmark.id),
                'post_id': str(bookmark.post.id),
                'title': bookmark.post.title,
                'content': bookmark.post.content,
                'created_at': bookmark.created_at.isoformat(),
                'updated_at': bookmark.updated_at.isoformat()
            })
        return jsonify(bookmarks_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
