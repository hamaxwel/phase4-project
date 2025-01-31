from datetime import datetime
from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from app.models.income import Income
from app.models.expense import Expense
from app.models.saving_goal import SavingGoal
from app.models.withdrawal import Withdrawal
from app.models.reminders import Reminder
from sqlalchemy import func
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash

# Create Blueprint instances
auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('user', __name__)
income_bp = Blueprint('income', __name__)
expense_bp = Blueprint('expense', __name__)
saving_goal_bp = Blueprint('saving_goal', __name__)
withdrawal_bp = Blueprint('withdrawal', __name__)
financial_bp = Blueprint('financial', __name__)
reminder_bp = Blueprint('reminder', __name__)

# ------------------- AUTH ROUTES -------------------

# User Registration
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=hashed_password,
        phone_number=data['phone_number']
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# User Login
@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

# Fetch all reminders for the authenticated user
@reminder_bp.route('/all', methods=['GET'])
@jwt_required()
def get_reminders():
    user_id = get_jwt_identity()
    # user = User.query.get_or_404(user_id)
    
    reminders = Reminder.query.filter_by(user_id=user_id).all()
    reminders_list = [
        {"goal_name": reminder.goal_name, "reminder_date": reminder.reminder_date}
        for reminder in reminders
    ]
    
    return jsonify(reminders_list), 200

# Add a new reminder
@reminder_bp.route('/add', methods=['POST'])
@jwt_required()
def add_reminder():
    data = request.get_json()
    goal_name = data.get('goal_name')
    reminder_date = data.get('reminder_date')

    # Validate the input data
    if not goal_name or not reminder_date:
        return jsonify({"message": "Goal name and reminder date are required."}), 400

    try:
        reminder_date = datetime.strptime(reminder_date, "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"message": "Invalid date format. Please use YYYY-MM-DD."}), 400

    user_id = get_jwt_identity()
    # user = User.query.get_or_404(user_id)

    # Create and add the new reminder
    new_reminder = Reminder(goal_name=goal_name, reminder_date=reminder_date, user_id=user_id)
    db.session.add(new_reminder)
    db.session.commit()

    return jsonify({"message": "Reminder added successfully."}), 201


# User Logout (Blacklist JWT)
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout_user():
    jti = get_jwt()["jti"]  # Get the token's unique identifier
    return jsonify({"message": "Logged out successfully"}), 200


# ------------------- USER PROFILE ROUTES -------------------

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


# ------------------- INCOME ROUTES -------------------

# Add Income
@income_bp.route('/add', methods=['POST'])
@jwt_required()
def add_income():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_income = Income(
        user_id=user_id,
        amount=data['amount'],
        date=datetime.strptime(data['date'], '%Y-%m-%d'),
        source=data['source']
    )

    db.session.add(new_income)
    db.session.commit()

    return jsonify({"message": "Income added successfully"}), 201


# Get All Incomes
@income_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_incomes():
    user_id = get_jwt_identity()
    incomes = Income.query.filter_by(user_id=user_id).all()

    return jsonify([{"amount": inc.amount, "date": inc.date, "source": inc.source} for inc in incomes])


# ------------------- EXPENSE ROUTES -------------------

# Add Expense
@expense_bp.route('/add', methods=['POST'])
@jwt_required()
def add_expense():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_expense = Expense(
        user_id=user_id,
        amount=data['amount'],
        date=datetime.strptime(data['date'], '%Y-%m-%d'),
        category=data['category']
    )

    db.session.add(new_expense)
    db.session.commit()

    return jsonify({"message": "Expense added successfully"}), 201


# Get All Expenses
@expense_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()

    return jsonify([{"amount": exp.amount, "date": exp.date, "category": exp.category} for exp in expenses])


# ------------------- SAVING GOAL ROUTES -------------------

# Add Savings Goal
@saving_goal_bp.route('/add', methods=['POST'])
@jwt_required()
def add_saving_goal():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_goal = SavingGoal(
        user_id=user_id,
        goal_name=data['goal_name'],
        target_amount=data['target_amount'],
        current_savings=data.get('current_savings', 0),
        due_date = datetime.strptime(data['due_date'], '%Y-%m-%d')
    )

    db.session.add(new_goal)
    db.session.commit()

    return jsonify({"message": "Saving goal added successfully"}), 201


# Get All Saving Goals
@saving_goal_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_saving_goals():
    user_id = get_jwt_identity()
    goals = SavingGoal.query.filter_by(user_id=user_id).all()

    return jsonify([{"goal_name": g.goal_name, "target_amount": g.target_amount, "current_savings": g.current_savings, "due_date": g.due_date} for g in goals])


# ------------------- WITHDRAWAL ROUTES -------------------

# Withdraw Savings
@withdrawal_bp.route('/add', methods=['POST'])
@jwt_required()
def add_withdrawal():
    data = request.get_json()
    user_id = get_jwt_identity()

    new_withdrawal = Withdrawal(
        user_id=user_id,
        amount=data['amount'],
        withdrawal_date=datetime.strptime(data['withdrawal_date'], '%Y-%m-%d'),
        reason=data['reason']
    )

    db.session.add(new_withdrawal)
    db.session.commit()

    return jsonify({"message": "Withdrawal successful"}), 201


# Get All Withdrawals
@withdrawal_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_withdrawals():
    user_id = get_jwt_identity()
    withdrawals = Withdrawal.query.filter_by(user_id=user_id).all()

    return jsonify([{"amount": w.amount, "withdrawal_date": w.withdrawal_date, "reason": w.reason} for w in withdrawals])


# ------------------- DASHBOARD ROUTE -------------------

@user_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    user_id = get_jwt_identity()

    user = User.query.get_or_404(user_id)

    return jsonify({
        "full_name": user.full_name,
        "email": user.email,
        "phone_number": user.phone_number
    })
#get financial overview
@financial_bp.route('/overview', methods=['GET'])
@jwt_required()
def get_financial_overview():
    current_user = get_jwt_identity()
    income = db.session.query(func.sum(Income.amount)).filter_by(user_id=current_user).scalar() or 0
    expenses = db.session.query(func.sum(Expense.amount)).filter_by(user_id=current_user).scalar() or 0
    savings = db.session.query(func.sum(SavingGoal.current_savings)).filter_by(user_id=current_user).scalar() or 0
    return jsonify({
        "total_income": income,
        "total_expenses": expenses,
        "total_savings": savings
    })



# ------------------- REGISTER BLUEPRINTS -------------------

# def register_routes(app):
#     app.register_blueprint(auth_bp, url_prefix='/auth')
#     app.register_blueprint(user_bp, url_prefix='/user')
#     app.register_blueprint(income_bp, url_prefix='/income')
#     app.register_blueprint(expense_bp, url_prefix='/expense')
#     app.register_blueprint(saving_goal_bp, url_prefix='/saving_goal')
#     app.register_blueprint(withdrawal_bp, url_prefix='/withdrawal')
#     app.register_blueprint(financial_bp, url_prefix='/financial')
#     app.register_blueprint(reminder_bp, url_prefix='/reminders')