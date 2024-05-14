import base64
import logging

from bson import ObjectId
from flask import Flask, Blueprint, request, jsonify, send_from_directory, session, g, current_app
from ..model.models import *
from werkzeug.security import generate_password_hash
from config import ICON_UPLOADED_FILE_PATH
from ..auth.auth import login_required
from ..user.forms import RegistrationForm
from utilities import upload_files
app = Flask(__name__)
user_db = Blueprint('user_db', __name__)


@user_db.route('/follow', methods=['POST'])
@login_required
def add_follow():
    follower_id = g.user_id
    following_id = request.form.get('following_id')

    if follower_id == following_id:
        return jsonify({'error': 'You cannot follow yourself'}), 400

    follower = User.objects(id=follower_id).first()
    following = User.objects(id=following_id).first()

    if not follower or not following:
        return jsonify({'error': 'Invalid user IDs'}), 404

    # check repeat
    existing_follow = Follow.objects(follower_id=follower, following_id=following).first()
    if existing_follow:
        return jsonify({'error': 'Already following'}), 409

    follow = Follow(follower_id=follower, following_id=following).save()
    return jsonify({'message': 'Follow successful'}), 200

@user_db.route('/followers', methods=['POST'])
@login_required
def get_followers():
    user_id = request.form.get('user_id')
    user = User.objects(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    followers = Follow.objects(following_id=user)

    followers_list = []
    for f in followers:
        if f.follower_id:
            follower_info = {
                'follower': f.follower_id.username,
                'follower_id': str(f.follower_id.id)  # 转换 ObjectID 为字符串
            }
            followers_list.append(follower_info)
        else:
            followers_list.append({'follower': 'Unknown', 'follower_id': None})

    return jsonify(followers_list), 200


@user_db.route('/register', methods=['POST'])
def user_register():
    form = RegistrationForm(request.form)
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data
        full_name = form.full_name.data
        bio = form.bio.data

        # if 'file' not in request.files:
        #     return jsonify({'message': 'No file part in the request'}), 400
        # file = request.files.get("file")
        # upload_result = upload_files(file, tag="icon")
        # new_filename = upload_result[0]

        if User.objects(username=username).first():
            return jsonify({'message': 'The user name has been registered'}), 409

        if User.objects(email=email).first():
            return jsonify({'message': 'Email has been registered'}), 409
        # make new user
        new_user = User(
            username=username,
            email=email,
            password=generate_password_hash(password),
            # icon=new_filename,
            full_name=full_name,
            bio=bio,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        new_user.save()

        user = User.objects(username=username).first()
        if user is None:
            logging.debug('user not created')
            return jsonify({'message': 'User could not be registered'}), 400

        token = user.create_token()
        user.token = token
        user.save()
        logging.debug('login success')
        return jsonify({'username': user.username, 'email': user.email, 'token': token}), 201
    else:
        return jsonify({'message': 'form validate failed', 'errors': form.errors}), 400


@user_db.route('/get_icon/', methods=['GET'])
@login_required
def get_icon():
    filename = User.objects(id=g.user_id).first().icon
    if not os.path.exists(ICON_UPLOADED_FILE_PATH+"//"+str(filename)):
        return jsonify({'message': 'image not found'}), 400
    return send_from_directory(ICON_UPLOADED_FILE_PATH, filename)



@user_db.route('/get_user', methods=['GET'])
def user_query():
    users_data = User.objects().only('username', 'email','icon')
    users_data_list = [{'username': user.username,
                        'email': user.email,
                        'id':str(user.id),
                        'icon':user.icon
                        } for user in users_data]
    return jsonify({'message': 'User information', 'result': users_data_list}), 200

@user_db.route('/user/<username>', methods=['GET'])
@login_required
def user_query_by_username(username):
    user_data = User.objects(username=username).first()
    if not user_data:
        return jsonify({'message': 'User does not exist'}), 404
    return jsonify(
        {
            'message': 'User information',
            'result': {
                'username': user_data.username,
                'email': user_data.email,
                'icon': user_data.icon,
                'bio': user_data.bio,
                'full_name': user_data.full_name
            }
        }
    ), 200


# get all posts of a user
@user_db.route('/user/<username>/posts', methods=['GET'])
@login_required
def user_posts(username):
    user = User.objects(username=username).first()
    if not user:
        return jsonify({'message': 'User does not exist'}), 404

    results = []
    user_data = {
        'username': user.username,
        'email': user.email,
        'icon': user.icon,
        'bio': user.bio,
        'full_name': user.full_name
    }
    results.append(user_data)
    posts_data = Post.objects(user=user)
    posts_data_list = []
    for post in posts_data:
        images = []
        for image_id in post.image_ids:
            image = current_app.config['GRIDFS'].get(ObjectId(image_id))
            image_base64 = base64.b64encode(image.read()).decode('utf-8')
            images.append(image_base64)
        likes_count = Like.objects(post=post).count()
        comments_count = Comment.objects(post=post).count()
        post_data = {
            'id': str(post.id),
            'title': post.title,
            'user': post.user.username,
            'likes': likes_count,
            'comments': comments_count,
            'tags': post.tags,
            'images': images
        }
        posts_data_list.append(post_data)
    results.append(posts_data_list)

    return jsonify(results), 200


@login_required
@user_db.route('/user/<username>', methods=['PUT'])
def user_update(username):
    user_data = User.objects(username=username).first()
    if not user_data:
        return jsonify({'message': 'User does not exist'}), 404

    user_data.update(
        icon=request.form.get('icon', user_data.icon),
        bio=request.form.get('bio', user_data.bio),
        full_name=request.form.get('full_name', user_data.full_name),
        updated_at=datetime.utcnow()
    )

    return jsonify({'message': 'success'}), 200


@login_required
@user_db.route('/user/<username>', methods=['DELETE'])
def user_delete(username):
    user_data = User.objects(username=username).first()
    if not user_data:
        return jsonify({'message': 'User does not exist'}), 404

    user_data.delete()
    return jsonify({'message': 'success'}), 200
