from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired
from app.models import Workspace


class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    submit = SubmitField('submit')
