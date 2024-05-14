from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    tags = StringField('tags')


class ReviewForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired()])
    postId = StringField('PostId', validators=[DataRequired()])

class gpt_validate(FlaskForm):
    content = StringField('Content', validators=[DataRequired()])


class BookmarkForm(FlaskForm):
    post_id = StringField('PostId', validators=[DataRequired()])

