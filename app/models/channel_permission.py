from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class ChannelPermission(db.Model, UserMixin):
    __tablename__ = 'channel_permissions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    permission_id = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'permission_id': self.permission_id,
        }
