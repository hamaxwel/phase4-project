from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from config import Config
from app.routes import register_routes
from app import create_app

# Initialize app
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
