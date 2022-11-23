from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import workspace_form
from app.models import User, db, Workspace, Image, Chat
from sqlalchemy import or_



chat_routes = Blueprint('chats', __name__)


# Get chats of current user
@chat_routes.route('/<int:workspace_Id>/me')
@login_required
def get_my_chats(workspace_Id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        chat_list = Chat.query.filter(Chat.workspace_id == workspace_Id).filter(or_(Chat.user_one_id == current_user.id, Chat.user_two_id == current_user.id))
        chats = [chat.to_dict() for chat in chat_list]
        return jsonify({'chats': chats}), 200
    else:
        return 404
