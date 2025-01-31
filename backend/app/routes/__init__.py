from .routes import auth_bp, user_bp, income_bp, expense_bp, saving_goal_bp, withdrawal_bp, financial_bp, reminder_bp
# from .user import user_bp

# Function to register all blueprints
def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(income_bp, url_prefix='/income')
    app.register_blueprint(expense_bp, url_prefix='/expense')
    app.register_blueprint(saving_goal_bp, url_prefix='/saving_goal')
    app.register_blueprint(withdrawal_bp, url_prefix='/withdrawal')
    app.register_blueprint(financial_bp, url_prefix='/financial')
    app.register_blueprint(reminder_bp, url_prefix='/reminder')