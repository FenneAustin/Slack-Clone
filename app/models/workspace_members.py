from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class WorkspaceMember(db.Model, UserMixin):
    __tablename__ = 'workspace_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), nullable=False)
    permission_id = db.Column(db.Integer, db.ForeignKey('workspace_permissions.id'), nullable=False)


    workspace = db.relationship("Workspace", back_populates="members")
    user = db.relationship("User", back_populates="my_workspaces")
    permission = db.relationship("WorkspacePermission")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'permission': self.permission
        }
