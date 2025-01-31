# routes/auth.py
from flask import Blueprint, request, jsonify
from app import db
from models.user import User
from werkzeug.security import generate_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Get JSON data from the request

    # Check if all required fields are present
    if not all(key in data for key in ['full_name', 'email', 'password', 'phone_number']):
        return jsonify({"message": "All fields are required"}), 400

    # Check if email is already registered
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "Email already in use"}), 400

    # Create new user
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=hashed_password,
        phone_number=data['phone_number']
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "An error occurred, please try again."}), 500
