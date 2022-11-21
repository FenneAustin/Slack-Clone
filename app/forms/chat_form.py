
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired
from app.models import Workspace


class ChatForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
