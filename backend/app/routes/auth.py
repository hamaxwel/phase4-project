from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

# Create Blueprint instance
auth_bp = Blueprint('auth', __name__)

# User Registration
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=hashed_password,
        # phone_number=data['phone_number']
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201
