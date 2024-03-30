from flask import Flask,Blueprint,request,g,jsonify
from ..model.models import *
from ..post.forms import PostForm
from bson import ObjectId
from ..auth.auth import login_required

app = Flask(__name__)
post_db = Blueprint('post_db', __name__)

@post_db.route('/posts', methods=['POST'])
@login_required
def create_post():
    form = PostForm(request.form)

    if form.validate():
        title = form.title.data
        content = form.content.data
        user = g.user_id

        # image_paths = request.form.getlist('image_paths[]')
        user = User.objects(id=ObjectId(user)).first()
        if not user:
            return jsonify({'message': 'user not exist'}), 404

        # 创建推文对象
        post = Post(
            title=title,
            content=content,
            user=user,
            image_paths=["image"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        # 保存推文到数据库
        post.save()

        return jsonify({'message': 'success', 'post_id': str(post.id)}), 201
    else:
        return jsonify({'message': 'failed', 'errors': form.errors}), 400

@post_db.route('/get_post', methods=['GET'])
def post_query():
    post_data = Post.objects().only('title', 'content', 'user')

    post_data_list = []
    for post in post_data:
        post_data_list.append({
            'title': post.title,
            'content': post.content,
            'user': post.user.username
        })

    return jsonify({'message': 'post information', 'result': post_data_list}), 200