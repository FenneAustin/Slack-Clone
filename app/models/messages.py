from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class Message(db.Model, UserMixin):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    chat_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chats.id')))
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')))
    text = db.Column(db.String(255))
    sent_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user = db.relationship("User")
    direct_message = db.relationship("Chat", back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages") # added last second

    def to_dict(self):
        return {
            'id': self.id,
            'user' : self.user.to_dict(),
            'text': self.text,
            'sent_date': self.sent_date,
        }
