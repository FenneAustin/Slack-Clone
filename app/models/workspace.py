
from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Workspace(db.Model, UserMixin):
    __tablename__ = 'workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    invite_url = db.Column(db.String(255), nullable=False)
    workspace_image_id = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'workspace_image_id': self.workspace_image_id
        }
