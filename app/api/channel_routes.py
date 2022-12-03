from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.channel_form import ChannelForm
from app.models import User, db, Workspace, Image, Channel, ChannelMember, ChannelPermission




channel_routes = Blueprint('channel', __name__)


# create a channel
@channel_routes.route('/<int:workspace_Id>/create', methods=['POST'])
@login_required
def create_channel(workspace_Id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        channel = Channel(
           name = form.data['name'],
           workspace_id = workspace_Id,
        )

        db.session.add(channel)
        db.session.commit()

        channel_member = ChannelMember(
            user_id = current_user.id,
            channel_id = channel.id,
            permission_id = 1
        )

        db.session.add(channel_member)
        db.session.commit()

        return channel.to_dict()
    else:
        return jsonify({'message': 'Worskpaces needs to have required fields'}), 400


# get all channels
@channel_routes.route('/<int:workspace_Id>')
@login_required
def get_workspace_channels(workspace_Id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        channel_list = Channel.query.filter(Channel.workspace_id == workspace_Id)
        channels = [channel.to_dict() for channel in channel_list]
        return jsonify({'channels': channels}), 200

# get all channels user is a member of
@channel_routes.route('/<int:workspace_Id>/user')
@login_required
def get_user_channels(workspace_Id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        # {channel.id: channel.to_dict() for channel in self.my_channels if channel.workspace_id == workspace_id}


        channel_list = cur_user.my_channels_list()
        # channels = [channel.to_dict() for channel in channel_list if channel.channel.workspace_id == workspace_Id]
        channels = [channel.channel for channel in channel_list ]
        channels = [channel.to_dict() for channel in channels if channel.workspace_id == workspace_Id]

        return jsonify({'channels': channels}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# user leaves a channel
@channel_routes.route('/<int:channel_Id>/leave', methods=['DELETE'])
@login_required
def leave_channel(channel_Id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        channel_member = ChannelMember.query.filter(ChannelMember.user_id == cur_user.id, ChannelMember.channel_id == channel_Id).first()
        db.session.delete(channel_member)
        db.session.commit()
        return jsonify({'message': 'User left channel'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# user joins a channel
@channel_routes.route('/<int:channel_Id>/join', methods=['POST'])
@login_required
def join_channel(channel_Id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        channel_member = ChannelMember(
            user_id = cur_user.id,
            channel_id = channel_Id,
            permission_id = 2
        )
        db.session.add(channel_member)
        db.session.commit()
        return jsonify({'message': 'User joined channel'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404
        
