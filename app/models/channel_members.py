from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class ChannelMember(db.Model, UserMixin):
    __tablename__ = 'channel_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    workspace_id = db.Column(db.Integer, nullable=False)
    permission_id = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'workspace_id': self.workspace_id,
            'permission_id': self.permission_id,
        }
