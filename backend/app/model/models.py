from datetime import datetime
from mongoengine import Document, StringField, IntField, ListField, DateTimeField, ReferenceField
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
import os
class User(Document):
    username = StringField(required=True, unique=False)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    icon = StringField(required=False)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    def verify_password(self, password):
        return check_password_hash(self.password, password)


    def create_token(self):
        s = Serializer(os.environ.get("SECRET_KEY"), expires_in=int(os.environ.get("TOKEN_EXPIRATION")))
        return s.dumps({'id': str(self.id)}).decode('utf-8')

class Post(Document):
    title = StringField(required=True)
    content = StringField(required=True)
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    image_paths = ListField(StringField())
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

class Like(Document):
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    post = ReferenceField(Post, reverse_delete_rule='CASCADE')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

class Bookmark(Document):
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    post = ReferenceField(Post, reverse_delete_rule='CASCADE')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

class Comment(Document):
    content = StringField(required=True)
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    post = ReferenceField(Post, reverse_delete_rule='CASCADE')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

class Message(Document):
    sender = ReferenceField(User, reverse_delete_rule='CASCADE')
    receiver = ReferenceField(User, reverse_delete_rule='CASCADE')
    content = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)