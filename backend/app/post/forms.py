from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    content = StringField('Content', validators=[DataRequired()])


class ReviewForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired()])
    postId = StringField('PostId', validators=[DataRequired()])


class BookmarkForm(FlaskForm):
    post_id = StringField('PostId', validators=[DataRequired()])
