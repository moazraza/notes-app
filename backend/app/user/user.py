from flask import Flask,Blueprint,request,jsonify
from app.models.models import *
from werkzeug.security import generate_password_hash
from ..user.forms import RegistrationForm
app = Flask(__name__)
user_db = Blueprint('user_db', __name__)

@user_db.route('/register', methods=['POST'])
def user_register():
    form = RegistrationForm(request.form)
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data

        if User.objects(username=username).first():
            return jsonify({'message': 'The user name has been registered'}), 409

        if User.objects(email=email).first():
            return jsonify({'message': 'Email has been registered'}), 409

        # make new user
        new_user = User(
            username=username,
            email=email,
            password=generate_password_hash(password),
            icon="icon",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        new_user.save()
        return jsonify({'message': 'success'}), 201
    else:
        return jsonify({'message': 'form validate failed', 'errors': form.errors}), 400

@user_db.route('/get_user', methods=['GET'])
def user_query():
    users_data  = User.objects().only('username', 'email')
    users_data_list = [{'username': user.username, 'email': user.email} for user in users_data]
    return jsonify({'message': 'User information','result':users_data_list}), 200


