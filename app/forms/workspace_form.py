
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from app.models import Workspace


class WorkspaceForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    submit = SubmitField('publish')
