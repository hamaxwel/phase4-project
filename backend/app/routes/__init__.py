from .auth import auth_bp
# from .user import user_bp

# Function to register all blueprints
def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    # app.register_blueprint(user_bp, url_prefix='/user')