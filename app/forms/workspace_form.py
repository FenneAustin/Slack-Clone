
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired
from app.models import Workspace


class WorkspaceForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    workspace_image_url = StringField('image_url')
    submit = SubmitField('publish')
