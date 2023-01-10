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
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')))
    direct_message = db.relationship("Chat", back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages") # added last second
    created_date = db.Column(db.Date, default=datetime.utcnow, nullable=False)
    updated_date = db.Column(db.Date, default=datetime.utcnow, nullable=False)


    replies = db.relationship(
        'Message', backref=db.backref('parent', remote_side=[id]),
        lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user' : self.user.to_dict(),
            'text': self.text,
            'sent_date': self.sent_date,
        }


    def user_comments_to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'channel_id': self.channel_id,
            'chat_id': self.chat_id,
            'parent_id': self.parent_id,
            'created_date': self.created_date,
            'updated_date': self.updated_date
        }

    def to_dict_special(self, session_user_id):

        num_replies = db.session.query(Message).filter(Message.parent_id == self.id).count()
        return {
            'id': self.id,
            'author': {
                    'user': self.user.to_dict()
            },
            'text': self.text,
            'num_replies': num_replies,
            'parent_id': self.parent_id,
            'channel_id': self.channel_id,
            'chat_id': self.chat_id,
            'created_date': self.created_date,
            'updated_date': self.updated_date
        }
