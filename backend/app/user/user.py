from flask import Flask,Blueprint,request,jsonify,send_from_directory,session,g
from ..model.models import *
from werkzeug.security import generate_password_hash
from backend.config import ICON_UPLOADED_FILE_PATH
from ..auth.auth import login_required
from ..user.forms import RegistrationForm
from backend.utilities import upload_files
app = Flask(__name__)
user_db = Blueprint('user_db', __name__)


@user_db.route('/register', methods=['POST'])
def user_register():
    form = RegistrationForm(request.form)
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400
        file = request.files.get("file")
        upload_result = upload_files(file, tag="icon")
        new_filename = upload_result[0]

        if User.objects(username=username).first():
            return jsonify({'message': 'The user name has been registered'}), 409

        if User.objects(email=email).first():
            return jsonify({'message': 'Email has been registered'}), 409
        # make new user
        new_user = User(
            username=username,
            email=email,
            password=generate_password_hash(password),
            icon=new_filename,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        new_user.save()
        return jsonify({'message': 'success'}), 201
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
