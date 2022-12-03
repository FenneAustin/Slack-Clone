from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import workspace_form
from app.models import User, db, Workspace, Image, Chat, WorkspaceInvite
from sqlalchemy import or_



invitations_routes = Blueprint('invitations', __name__)

# Get all workspace invite of current user
@invitations_routes.route('/me')
@login_required
def get_my_invitations():
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        invitation_list = WorkspaceInvite.query.filter(WorkspaceInvite.invited_user_id == current_user.id)
        invitations = [invitation.to_dict() for invitation in invitation_list]
        return jsonify({'invitations': invitations}), 200
    else:
        return 404

# Accept workspace invite
@invitations_routes.route('/<int:invitation_id>/accept', methods=['POST'])
@login_required
def accept_invitation(invitation_id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        invitation = WorkspaceInvite.query.get(invitation_id)
        if (invitation):
            workspace = Workspace.query.get(invitation.workspace_id)
            workspace.users.append(cur_user)
            db.session.delete(invitation)
            db.session.commit()
            return jsonify({'workspace': workspace.to_dict()}), 200
        else:
            return 404
    else:
        return 404

# Decline workspace invite
@invitations_routes.route('/<int:invitation_id>/decline')
@login_required
def decline_invitation(invitation_id):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        invitation = WorkspaceInvite.query.get(invitation_id)
        if (invitation):
            db.session.delete(invitation)
            db.session.commit()
            return 200
        else:
            return 404
    else:
        return 404


# send a workspace invite to a user by user id
@invitations_routes.route('/<int:workspace_id>/send/<email>', methods=['POST'])
@login_required
def send_invitation(workspace_id, email):
    cur_user = User.query.get(current_user.id)
    if (cur_user):
        workspace = Workspace.query.get(workspace_id)
        if (workspace):
            # get user by email
            user = User.query.filter(User.email == email).first()
            if (user):
                invitation = WorkspaceInvite(
                    workspace_id=workspace.id,
                    invited_user_id=user.id
                )
                db.session.add(invitation)
                db.session.commit()
                return jsonify({'invitation': invitation.to_dict()}), 200
            else:
                return 404
        else:
            return 404
    else:
        return 404
