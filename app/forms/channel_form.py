from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from app.models import Workspace


class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    workspace_Id = IntegerField('workspace_Id', validators=[DataRequired()])
    description = TextAreaField('description')
    submit = SubmitField('submit')
