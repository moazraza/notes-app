import logging

from flask import Flask, Blueprint, request, jsonify, g
from ..model.models import *
from ..auth.forms import LoginForm
import functools
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
import os
from bson import ObjectId
import jwt

app = Flask(__name__)
auth_db = Blueprint('auth_db', __name__)


@auth_db.route('/login', methods=['POST'])
def login():
    logging.debug('trying to login')
    data = request.get_json()
    form = LoginForm(data=data)
    if form.validate():
        username = form.username.data
        password = form.password.data

        user = User.objects(username=username).first()
        if user is None:
            logging.debug('user does not exist')
            return jsonify({'message': 'user not exist'}), 404

        if not user.verify_password(password):
            logging.debug('error password')
            return jsonify({'message': 'error password'}), 401

        token = user.create_token()
        user.token = token
        user.save()
        logging.debug('login success')
        return jsonify({'username': user.username, 'email': user.email, 'token': token}), 200
    else:
        return jsonify({'message': 'failed', 'errors': form.errors}), 400


def verify_token(token):
    try:
        payload = jwt.decode(token, os.environ.get("SECRET_KEY"), algorithms=['HS256'])
        user_id = payload.get('user_id')
        user = User.objects(id=ObjectId(user_id)).first()
        if not user:
            raise Exception("user not exist")
        g.user_id = user_id
        return True
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'token expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'message': 'token incorrect'}), 400


def login_required(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            raise Exception("lost Authorization parameter")
        if verify_token(token):
            return func(*args, **kwargs)

    return wrapper
