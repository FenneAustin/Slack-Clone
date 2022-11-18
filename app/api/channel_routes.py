from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import channel_form
from app.models import User, db, Workspace, Image, Channel




channel_routes = Blueprint('channel', __name__)


# create a channel
@channel_routes.route('/<int:workspace_id>/create', methods=['POST'])
@login_required
def create_channel():
    form = channel_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        channel = Channel(
           owner_id = current_user.id,
           name = form.data['name'],
        )

        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    else:
        return jsonify({'message': 'Worskpaces needs to have required fields'}), 400



@channel_routes.route('/<int:workspace_Id>')
@login_required
def get_workspace_channels(workspace_Id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        channel_list = Channel.query.filter(Channel.workspace_id == workspace_Id)
        channels = [channel.to_dict() for channel in channel_list]
        return jsonify({'channels': channels}), 200

# edit a workspace

# delete a workspace
