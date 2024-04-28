import logging

from flask import Flask, Blueprint, request, g, jsonify
from flask import Flask,Blueprint,request,g,jsonify,session
from ..model.models import *
# from backend.app.model.models import *
from ..post.forms import PostForm
from bson import ObjectId
from ..auth.auth import login_required
from backend.utilities import upload_files
from mongoengine.errors import DoesNotExist


app = Flask(__name__)
post_db = Blueprint('post_db', __name__)


@post_db.route('/post_images', methods=['POST'])
@login_required
def upload_images():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    file = request.files.get("file")
    if file:
        upload_result = upload_files(file,tag="notes")
        if not upload_result:
            return jsonify({'message': 'upload file failed_2'}), 400
        new_filename =upload_result[0]
        original_filename=upload_result[1]
        uploaded_files = session.get('uploaded_files', [])
        uploaded_files.append(new_filename)
        session['uploaded_files'] = uploaded_files
        print(session['uploaded_files'])
        return jsonify({'message': 'File uploaded successfully'}), 200
    return jsonify({'message': 'File uploaded failed'}), 400




@post_db.route('/posts', methods=['POST'])
@login_required
def create_post():
    if request.method == "POST":
        form = PostForm(request.form)
        if form.validate():
            title = form.title.data
            content = form.content.data
            user = g.user_id
            # image_paths = request.form.getlist('image_paths[]')
            user = User.objects(id=ObjectId(user)).first()
            if not user:
                return jsonify({'message': 'user not exist'}), 404
            uploaded_files = session.get('uploaded_files', [])
            # make new post
            print(uploaded_files)
            # try:
            post = Post(
                title=title,
                content=content,
                user=user,
                image_paths=uploaded_files,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            session.pop('uploaded_files', None)
            post.save()
            # except:
            #     if isinstance(e, UploadFailedException):
            #         clear_uploaded_files(uploaded_files)

            return jsonify({'message': 'success', 'post_id': str(post.id)}), 201
        else:
            return jsonify({'message': 'failed', 'errors': form.errors}), 400


@post_db.route('/get_post', methods=['GET'])
def post_query():
    post_data = Post.objects().only('title', 'content', 'user', 'image_paths')
    post_data_list = []

    for post in post_data:
        try:
            username = post.user.username if post.user else 'Unknown User'
        except DoesNotExist:
            username = 'Unknown User'

        post_data_list.append({
            'title': post.title,
            'content': post.content
        })

    logging.debug("Fetched Posts Data: %s", post_data_list)

    return jsonify(post_data_list), 200
