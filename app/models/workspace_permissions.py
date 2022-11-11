from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class WorkspacePermission(db.Model, UserMixin):
    __tablename__ = 'workspace_permissions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    permission = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'permission': self.permission
        }
