from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.workspace_form import WorkspaceForm
from app.models import User, db, Workspace, Image, WorkspaceMember, ChannelMember




workspace_routes = Blueprint('workspace', __name__)


# create a workspace
@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace():
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace = Workspace(
           name = form.data['name'],
           owner_id = current_user.id,
           workspace_image_id = 9,
        )

        db.session.add(workspace)
        db.session.commit()
        # create a workspace member for the owner
        workspace_member = WorkspaceMember(
            workspace_id=workspace.id,
            user_id=current_user.id,
            permission_id= 2
        )
        db.session.add(workspace_member)
        db.session.commit()
        return jsonify({'workspace': workspace.to_dict()})
    else:
        return jsonify({'message': 'Worskpaces needs to have required fields'}), 400

# get workspace info my id
@workspace_routes.route('/<int:workspace_id>')
def get_workspace_info(workspace_id):
    workspace = Workspace.query.filter(Workspace.id == workspace_id).first()
    if workspace:
        workspace_obj = workspace.to_dict()
        return jsonify({workspace_obj}), 200
    else:
        return jsonify({'message': 'Workspace could not be found'}), 404


# get all workspaces by loggedin user
@workspace_routes.route('/me/')
@login_required
def get_my_workspaces():
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        # workspace_list = cur_user.my_workspaces_list()
        workspace_list = cur_user.my_workspaces_list()
        owner_list = cur_user.my_owned_list()
        workspaces = [workspace.workspace_info() for workspace in workspace_list]
        owners = [workspace.to_dict() for workspace in owner_list]
        return jsonify({'workspaces': workspaces + owners})


# delete a workspace by id
@workspace_routes.route('/<int:workspace_id>/delete', methods=['DELETE'])
@login_required
def delete_workspace(workspace_id):
    workspace = Workspace.query.filter(Workspace.id == workspace_id).first()
    if workspace:
        if workspace.owner_id == current_user.id:
            db.session.delete(workspace)
            db.session.commit()
            return jsonify({'message': 'Workspace deleted'}), 200
        else:
            return jsonify({'message': 'You are not the owner of this workspace'}), 401
    else:
        return jsonify({'message': 'Workspace could not be found'}), 404


# return a list of all users in the workspace
@workspace_routes.route('/<int:workspace_id>/users')
@login_required
def get_workspace_users(workspace_id):
    workspace = Workspace.query.filter(Workspace.id == workspace_id).first()
    if workspace:
        workspace_member_list = WorkspaceMember.query.filter(WorkspaceMember.workspace_id == workspace_id).all()
        workspace_members = [workspace_member.to_dict() for workspace_member in workspace_member_list]
        return jsonify({'users': workspace_members}), 200
    else:
        return jsonify({'message': 'Workspace could not be found'}), 404


# edit a workspace by id
@workspace_routes.route('/<int:workspace_id>/edit', methods=['PUT'])
@login_required
def edit_workspace(workspace_id):
    workspace = Workspace.query.filter(Workspace.id == workspace_id).first()
    if workspace:
        if workspace.owner_id == current_user.id:
            form = WorkspaceForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                workspace.name = form.data['name']
                if form.data['image']:
                    image = Image(
                        url = form.data['image']
                    )
                    db.session.add(image)
                    db.session.commit()
                    workspace.workspace_image_id = image.id
                    db.session.commit()
                else :
                    db.session.commit()
                return jsonify({'workspace': workspace.to_dict()})
            else:
                return jsonify({'message': 'Worskpaces needs to have required fields'}), 400
        else:
            return jsonify({'message': 'You are not the owner of this workspace'}), 401
    else:
        return jsonify({'message': 'Workspace could not be found'}), 404


# remove a user from the workspace by user id and workspace id
@workspace_routes.route('/<int:workspace_id>/users/<int:user_id>/remove', methods=['DELETE'])
@login_required
def remove_user_from_workspace(workspace_id, user_id):
    workspace = Workspace.query.filter(Workspace.id == workspace_id).first()
    if workspace:
        if workspace.owner_id == current_user.id:
            workspace_member = WorkspaceMember.query.filter(WorkspaceMember.workspace_id == workspace_id, WorkspaceMember.user_id == user_id).first()
            if workspace_member:
                db.session.delete(workspace_member)
                db.session.commit()
                # delete channel members where userid is the user_id
                channel_members = ChannelMember.query.filter(ChannelMember.user_id == user_id).all()
                for channel_member in channel_members:
                    db.session.delete(channel_member)
                    db.session.commit()
                return jsonify({'message': 'User removed from workspace'}), 200
            else:
                return jsonify({'message': 'User could not be found in this workspace'}), 404
        else:
            return jsonify({'message': 'You are not the owner of this workspace'}), 401
    else:
        return jsonify({'message': 'Workspace could not be found'}), 404


# user can leave a workspace by workspace id and user id
@workspace_routes.route('/<int:workspace_id>/leave', methods=['DELETE'])
@login_required
def leave_workspace(workspace_id):
    workspace = Workspace.query.filter(Workspace.id == workspace_id).first()
    if workspace:
        workspace_member = WorkspaceMember.query.filter(WorkspaceMember.workspace_id == workspace_id, WorkspaceMember.user_id == current_user.id).first()
        if workspace_member:
            db.session.delete(workspace_member)
            db.session.commit()
            # delete channel members where userid is the user_id
            channel_members = ChannelMember.query.filter(ChannelMember.user_id == current_user.id).all()
            for channel_member in channel_members:
                db.session.delete(channel_member)
                db.session.commit()
            return jsonify({'message': 'User left workspace'}), 200
        else:
            return jsonify({'message': 'User could not be found in this workspace'}), 404
    else:
        return jsonify({'message': 'Workspace could not be found'}), 404
