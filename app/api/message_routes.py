from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import workspace_form
from app.models import User, db, Workspace, Image, Chat, Message
from sqlalchemy import or_



message_routes = Blueprint('messages', __name__)



@message_routes.route('/chats/<int:chat_Id>')
@login_required
def get_chat_messages(chat_Id):
    cur_user = User.query.get(current_user.id)

    if (cur_user):
        chat = Message.query.filter(Message.chat_id == chat_Id)
        if (chat):
            messages = [ chats.to_dict() for chats in chat]

            return jsonify({'messages': messages}), 200
        else:
            return jsonify({'chats': 'none'}), 404
