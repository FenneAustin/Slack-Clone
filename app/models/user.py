from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('statuses.id')))
    profile_image_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('images.id')))

    status = db.relationship("Status", lazy="joined")
    profile_image = db.relationship("Image", lazy="joined")
    my_workspaces = db.relationship("WorkspaceMember", foreign_keys="WorkspaceMember.user_id", cascade="all, delete-orphan", lazy="dynamic")
    my_channels = db.relationship("ChannelMember", foreign_keys="ChannelMember.user_id", cascade="all, delete-orphan")
    sent_messages = db.relationship("Message", cascade="all, delete-orphan")
    workspace_invitations = db.relationship("WorkspaceInvite", foreign_keys="WorkspaceInvite.invited_user_id", cascade="all, delete-orphan")
    owned_workspaces = db.relationship("Workspace", foreign_keys="Workspace.owner_id", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'profile_image_id': self.profile_image_id,
            'email': self.email,
            'first_name':  self.first_name,
            'last_name': self.last_name
        }

    def my_workspaces_list(self):
        return self.my_workspaces.all()
