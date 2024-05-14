import base64
import logging
from flask import Flask, Blueprint, request, g, jsonify, session, send_from_directory, current_app
from werkzeug.utils import secure_filename
from ..model.models import *
# from backend.app.model.models import *
from ..post.forms import PostForm,ReviewForm
from bson import ObjectId
from ..auth.auth import login_required
from utilities import upload_files
from mongoengine.errors import DoesNotExist
from config import POST_UPLOADED_FILE_PATH,ICON_UPLOADED_FILE_PATH


app = Flask(__name__)
post_db = Blueprint('post_db', __name__)


@post_db.route('/post_images', methods=['POST'])
@login_required
def upload_images():
    if 'files' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    files = request.files.get("files")
    if files:
        upload_result = upload_files(files, tag="notes")
        if not upload_result:
            logging.debug("upload file failed_2")
            return jsonify({'message': 'upload file failed_2'}), 400
        new_filename =upload_result[0]
        original_filename=upload_result[1]
        uploaded_files = session.get('uploaded_files', [])
        uploaded_files.append(new_filename)
        session['uploaded_files'] = uploaded_files
        # print(session['uploaded_files'])
        return jsonify({'message': 'File uploaded successfully'}), 200
    return jsonify({'message': 'File uploaded failed'}), 400


@post_db.route('/get_images/', methods=['GET'])
@login_required
def get_images():
    filename = request.args.get('filename', '')
    if not os.path.exists(POST_UPLOADED_FILE_PATH+"//"+str(filename)):
        return jsonify({'message': 'image not found'}), 400
    return send_from_directory(POST_UPLOADED_FILE_PATH, filename)

@post_db.route('/posts/review', methods=['POST'])
@login_required
def create_comment():
    if request.method == "POST":
        form = ReviewForm(request.form)
        if form.validate():
            content = form.content.data
            postId = form.postId.data
            user = g.user_id
            # image_paths = request.form.getlist('image_paths[]')
            user = User.objects(id=ObjectId(user)).first()
            if not user:
                return jsonify({'message': 'user not exist'}), 404
            post = Post.objects(id=ObjectId(postId)).first()
            if not post:
                return jsonify({'message': 'post not exist'}), 404
            comment = Comment(
                content=content,
                user=user,
                post=post,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            comment.save()
            return jsonify({'message': 'success', 'post_id': str(post.id),'user_id': str(user.id)}), 201
        else:
            return jsonify({'message': 'failed', 'errors': form.errors}), 400


@post_db.route('/posts/comments', methods=['GET'])
def get_comments():
    try:
        post_id = request.args.get('postId', '')
        if not Post.objects(id=ObjectId(post_id)).first():
            return jsonify({'message': 'Post not found'}), 404

        comments = Comment.objects(post=ObjectId(post_id))
        comments_data = []
        for comment in comments:
            comments_data.append({
                'id': str(comment.id),
                'content': comment.content,
                'user_id': str(comment.user.id),
                'username': comment.user.username,
                'created_at': comment.created_at.isoformat(),
                'updated_at': comment.updated_at.isoformat()
            })

        return jsonify(comments_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@post_db.route('/posts/create', methods=['POST'])
@login_required
def create_post():
    if request.method == "POST":
        # data = request.get_json()
        form = PostForm(request.form)
        logging.debug("Creating Post")
        logging.debug(form.title.data)
        if form.validate():
            title = form.title.data
            content = form.content.data
            user = g.user_id
            # image_paths = request.form.getlist('image_paths[]')
            user = User.objects(id=ObjectId(user)).first()
            if not user:
                return jsonify({'message': 'user not exist'}), 404
            # uploaded_files = session.get('uploaded_files')
            # make new post
            # print(uploaded_files)
            # Handle file uploads
            image_ids = []
            if 'files' in request.files:
                files = request.files.getlist('files')
                for file in files:
                    filename = secure_filename(file.filename)
                    file_id = current_app.config['GRIDFS'].put(file, filename=filename)
                    image_ids.append(str(file_id))

            tags = []
            if 'tags' in request.form:
                tags = request.form.getlist('tags')
                logging.debug('Tags: %s', tags)

            # try:
            post = Post(
                title=title,
                content=content,
                user=user,
                image_ids=image_ids,
                tags=tags,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            session.pop('uploaded_files', None)
            post.save()
            return jsonify({'message': 'success', 'post_id': str(post.id)}), 201
        else:
            return jsonify({'message': 'failed', 'errors': form.errors}), 400


@post_db.route('/get_post', methods=['GET'])
def post_query():
    post_data = Post.objects().only('id','title', 'user', 'image_ids')
    post_data_list = []

    for post in post_data:
        try:
            username = post.user.username if post.user else 'Unknown User'
        except DoesNotExist:
            username = 'Unknown User'

        # get images from GridFS
        images = []
        for image_id in post.image_ids:
            image = current_app.config['GRIDFS'].get(ObjectId(image_id))
            image_base64 = base64.b64encode(image.read()).decode('utf-8')
            images.append(image_base64)

        post_data_list.append({
            'id': str(post.id),
            'title': post.title,
            'user': username,
            'images': images
        })

    logging.debug("Fetched Posts Data: %s", post_data_list)

    return jsonify(post_data_list), 200
