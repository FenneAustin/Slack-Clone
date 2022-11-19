from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import workspace_form
from app.models import User, db, Workspace, Image




direct_messages_routes = Blueprint('directmessages', __name__)


# create a message
# @direct_messages_routes.route('/', methods=['POST'])
# @login_required
# def create_workspace():
#     form = workspace_form()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():

#         workspace = Workspace(
#            owner_id = current_user.id,
#            name = form.data['name'],
#         )

#         db.session.add(workspace)
#         db.session.commit()
#         return workspace.to_dict()
#     else:
#         return jsonify({'message': 'Worskpaces needs to have required fields'}), 400
