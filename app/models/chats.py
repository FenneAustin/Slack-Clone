from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Chat(db.Model, UserMixin):
    __tablename__ = 'chats'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('workspaces.id')))
    user_one_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user_two_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user_one = db.relationship("User", foreign_keys=[user_one_id])
    user_two = db.relationship("User", foreign_keys=[user_two_id])
    workspace = db.relationship("Workspace", foreign_keys=[workspace_id])
    messages = db.relationship("Message",  cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'user_one': self.user_one.to_dict(),
            'user_two': self.user_two.to_dict(),
        }
