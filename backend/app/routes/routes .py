from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from app.models.income import Income
from app.models.expense import Expense
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

# Create Blueprint instances
auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('user', __name__)
income_bp = Blueprint('income', __name__)
expense_bp = Blueprint('expense', __name__)

# User Registration
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=hashed_password,
        phone_number=data['phone_number']
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# User Login and JWT Token Generation
@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200


# Get User Profile
@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)

    return jsonify({
        "full_name": user.full_name,
        "email": user.email,
        "phone_number": user.phone_number
    })


# Add Income
@income_bp.route('/add', methods=['POST'])
@jwt_required()
def add_income():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_income = Income(
        user_id=user_id,
        amount=data['amount'],
        date=data['date'],
        source=data['source']
    )

    db.session.add(new_income)
    db.session.commit()

    return jsonify({"message": "Income added successfully", "income": {
        "amount": new_income.amount,
        "date": new_income.date,
        "source": new_income.source
    }}), 201


# Get All Incomes for the Logged-in User
@income_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_incomes():
    user_id = get_jwt_identity()
    incomes = Income.query.filter_by(user_id=user_id).all()

    income_list = []
    for income in incomes:
        income_list.append({
            "amount": income.amount,
            "date": income.date,
            "source": income.source
        })

    return jsonify(income_list)


# Add Expense
@expense_bp.route('/add', methods=['POST'])
@jwt_required()
def add_expense():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_expense = Expense(
        user_id=user_id,
        amount=data['amount'],
        date=data['date'],
        category=data['category']
    )

    db.session.add(new_expense)
    db.session.commit()

    return jsonify({"message": "Expense added successfully", "expense": {
        "amount": new_expense.amount,
        "date": new_expense.date,
        "category": new_expense.category
    }}), 201


# Get All Expenses for the Logged-in User
@expense_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()

    expense_list = []
    for expense in expenses:
        expense_list.append({
            "amount": expense.amount,
            "date": expense.date,
            "category": expense.category
        })

    return jsonify(expense_list)


# Update User Profile
@user_bp.route('/update', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    user_id = get_jwt_identity()

    user = User.query.get_or_404(user_id)
    user.full_name = data.get('full_name', user.full_name)
    user.email = data.get('email', user.email)
    user.phone_number = data.get('phone_number', user.phone_number)
    
    db.session.commit()

    return jsonify({"message": "Profile updated successfully"})


# Delete User Profile
@user_bp.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_profile():
    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200


# Register the Blueprints
def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(income_bp, url_prefix='/income')
    app.register_blueprint(expense_bp, url_prefix='/expense')