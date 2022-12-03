from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Channel(db.Model, UserMixin):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workspaces.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    workspace = db.relationship("Workspace", back_populates="channels")
    channel_members = db.relationship("ChannelMember", back_populates="channel")

    def to_dict(self):
        return {
            'id': self.id,
            'workspace_id': self.workspace_id,
            'name': self.name,
            'description': self.description,
            'total_members': len(self.channel_members)
        }
