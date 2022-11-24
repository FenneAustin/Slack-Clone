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

@message_routes.route('/channel/<int:channel_Id>')
@login_required
def get_channel_messages(channel_Id):
    cur_user = User.query.get(current_user.id)

    if (cur_user):
        chat = Message.query.filter(Message.channel_id == channel_Id)
        if (chat):
            messages = [ chats.to_dict() for chats in chat]

            return jsonify({'messages': messages}), 200
        else:
            return jsonify({'chats': 'none'}), 404


# create a new message
@message_routes.route('/new', methods=['POST'])
@login_required
def new_message():
    form = request.get_json()
    cur_user = User.query.get(current_user.id)

    if (cur_user):
        new_message = Message(
            user_id = form['user_id'],
            chat_id = form['chat_id'],
            channel_id = form['channel_id'],
            text = form['message'],
        )
        db.session.add(new_message)
        db.session.commit()
        return jsonify({'message': new_message.to_dict()}), 200
    else:
        return jsonify({'message': 'none'}), 404


#delete a message
@message_routes.route('/delete/<int:message_Id>', methods=['DELETE'])
@login_required
def delete_message(message_Id):
    cur_user = User.query.get(current_user.id)

    if (cur_user):
        message = Message.query.get(message_Id)
        if (message):
            db.session.delete(message)
            db.session.commit()
            return jsonify({'message': 'deleted'}), 200
        else:
            return jsonify({'message': 'none'}), 404
    else:
        return jsonify({'message': 'none'}), 404
