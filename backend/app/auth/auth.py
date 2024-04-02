from flask import Flask,Blueprint,request,jsonify,g
from ..model.models import *
from ..auth.forms import LoginForm
import functools
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
import os
from bson import ObjectId

app = Flask(__name__)
auth_db = Blueprint('auth_db', __name__)

@auth_db.route('/login', methods=['POST'])
def login():
    form = LoginForm(request.form)
    if form.validate():
        username = form.username.data
        password = form.password.data

        user = User.objects(username=username).first()
        if user is None:
            return jsonify({'message': 'user not exist'}), 404

        if not user.verify_password(password):
            return jsonify({'message': 'error password'}), 401


        token = user.create_token()
        user.token = token
        user.save()

        return jsonify({'username': user.username, 'email': user.email, 'token': token})
    else:
        return jsonify({'message': 'failed', 'errors': form.errors}), 400

def verify_token(token):
    s = Serializer(os.environ.get("SECRET_KEY"))
    try:
        data = s.loads(token)
    except SignatureExpired:
        raise Exception("token expired")
    except BadSignature:
        raise Exception("token incorrect")

    user_id = data.get('id')

    user = User.objects(id=ObjectId(user_id)).first()
    if not user:
        raise Exception("user not exist")
    g.user_id = user_id
    return True

def login_required(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            raise Exception("lost Authorization parameter")
        if verify_token(token):
            return func(*args, **kwargs)
    return wrapper