
from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Workspace(db.Model, UserMixin):
    __tablename__ = 'workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    workspace_image_id = db.Column(db.Integer, db.ForeignKey('images.id', ondelete="SET NULL"))


    owner = db.relationship("User", back_populates="owned_workspaces")
    members = db.relationship("WorkspaceMember", cascade="all, delete-orphan")
    channels = db.relationship("Channel", cascade="all, delete-orphan")
    workspace_image = db.relationship("Image", lazy="joined")
    invitations = db.relationship("WorkspaceInvite", foreign_keys="WorkspaceInvite.workspace_id", cascade="all, delete-orphan")
    chats = db.relationship('Chat', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'workspace_image_id': self.workspace_image_id
        }
