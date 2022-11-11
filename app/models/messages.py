from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Message(db.Model, UserMixin):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer)
    channel_id = db.Column(db.Integer)
    text = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'chat_id': self.chat_id,
            'channel_id': self.channel_id,
            'text': self.text
        }
