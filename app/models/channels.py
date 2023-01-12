from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
import datetime


class Channel(db.Model, UserMixin):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workspaces.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    workspace = db.relationship("Workspace", back_populates="channels")
    channel_members = db.relationship("ChannelMember", back_populates="channel", cascade="all, delete-orphan")
    owner = db.relationship("User",back_populates="owned_channels")
    messages = db.relationship("Message", cascade="all, delete-orphan") # added last second

    def to_dict(self):

        return {
            'id': self.id,
            'workspace_id': self.workspace_id,
            'name': self.name,
            'description': self.description,
            'total_members': len(self.channel_members),
            'owner_info': self.owner.to_dict(),
            'created_at': self.created_at
        }
