from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import workspace_form
from app.models import User, db, Workspace, Image




workspace_routes = Blueprint('workspace', __name__)


# create a workspace
@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace():
    form = workspace_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        workspace = Workspace(
           owner_id = current_user.id,
           name = form.data['name'],
        )

        db.session.add(workspace)
        db.session.commit()
        return workspace.to_dict()
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
        workspaces = [workspace.workspace_info() for workspace in workspace_list]
        return jsonify({'workspaces': workspaces})

# edit a workspace

# delete a workspace
