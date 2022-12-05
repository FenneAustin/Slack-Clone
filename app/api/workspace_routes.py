from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.workspace_form import WorkspaceForm
from app.models import User, db, Workspace, Image




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
        )

        db.session.add(workspace)
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
