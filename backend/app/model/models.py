from datetime import datetime, timedelta
from mongoengine import Document, StringField, IntField, ListField, DateTimeField, ReferenceField
from werkzeug.security import check_password_hash
import os
import jwt


class User(Document):
    username = StringField(required=True, unique=False)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    icon = StringField(required=False)
    bio = StringField(required=False)
    full_name = StringField(required=False)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    meta = {'collection': 'users'}

    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def create_token(self):
        payload = {
            'user_id': str(self.id),
            'exp': datetime.utcnow() + timedelta(seconds=int(os.environ.get("TOKEN_EXPIRATION")))
        }
        token = jwt.encode(payload, os.environ.get("SECRET_KEY"), algorithm='HS256')
        return token


class Post(Document):
    title = StringField(required=True)
    content = StringField(required=True)
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    image_paths = ListField(StringField())
    likes = ReferenceField('Like')
    bookmarks = ReferenceField('Bookmark')
    comments = ReferenceField('Comment')
    tags = ListField(StringField())
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    meta = {'collection': 'posts'}


class Like(Document):
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    post = ReferenceField(Post, reverse_delete_rule='CASCADE')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    meta = {'collection': 'likes'}


class Bookmark(Document):
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    post = ReferenceField(Post, reverse_delete_rule='CASCADE')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    meta = {'collection': 'bookmarks'}


class Comment(Document):
    content = StringField(required=True)
    user = ReferenceField(User, reverse_delete_rule='CASCADE')
    post = ReferenceField(Post, reverse_delete_rule='CASCADE')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    meta = {'collection': 'comments'}


class Message(Document):
    sender = ReferenceField(User, reverse_delete_rule='CASCADE')
    receiver = ReferenceField(User, reverse_delete_rule='CASCADE')
    content = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    meta = {'collection': 'messages'}


class Follow(Document):
    follower_id = ReferenceField(User, reverse_delete_rule='CASCADE')
    following_id = ReferenceField(User, reverse_delete_rule='CASCADE')
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    meta = {'collection': 'follows'}


Post.register_delete_rule(Like, 'likes', 'CASCADE')
Post.register_delete_rule(Bookmark, 'bookmarks', 'CASCADE')
Post.register_delete_rule(Comment, 'comments', 'CASCADE')
