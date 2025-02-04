from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS


from config import Config

# Initialize the extensions
db = SQLAlchemy()
jwt = JWTManager()
ma = Marshmallow()
migrate = Migrate()


def create_app():
    # Initialize app
    app = Flask(__name__)

    # App Config
    app.config.from_object(Config)

    
    # Enable CORS for all routes
    CORS(app, origins=["*"])  

    # OR to restrict to your frontend domain (more secure)
    # CORS(app, origins=["https://your-frontend.vercel.app"])

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # Register routes
    from app.routes import register_routes
    register_routes(app)

    return app