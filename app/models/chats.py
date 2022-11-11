from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Chat(db.Model, UserMixin):
    __tablename__ = 'chats'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_one_id = db.Column(db.Integer, nullable=False)
    user_two_id = db.Column(db.Integer, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'user_one_id': self.user_one_id,
            'user_two_id': self.user_two_id,
        }
