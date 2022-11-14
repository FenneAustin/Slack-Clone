from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class WorkspaceInvite(db.Model, UserMixin):
    __tablename__ = 'workspace_invites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    invited_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'))

    invited_user = db.relationship("User", foreign_keys=[invited_user_id], back_populates="workspace_invitations")
    workspace = db.relationship("Workspace", foreign_keys=[workspace_id], back_populates="invitations")

    def to_dict(self):
        return {
            'id': self.id,
            'invited_user_id': self.invited_user_id,
        }
