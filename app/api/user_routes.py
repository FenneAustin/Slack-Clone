from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Image, db
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/edit/image', methods=['PUT'])
@login_required
def edit_image():


    if "image" not in request.files:
        return {"errors": "image required"}, 409

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 404

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)


    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    if url:
        imageId = current_user.profile_image_id
        # get image by imageId
        image = Image.query.get(imageId)
        # update image url
        image.url = url
        db.session.commit()

        return current_user.to_dict()

    return {"errors": "upload unsuccesful"}, 404
