from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Status(db.Model, UserMixin):
    __tablename__ = 'statuses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(40), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'status': self.status,
        }
