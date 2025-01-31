# config.py
import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://bodadb_8s8r_user:N7T7Gx6Q4vUQNCy08w1d5crq4OwtSeUf@dpg-cuedb0dds78s73accesg-a.oregon-postgres.render.com/bodadb_8s8r'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'your_jwt_secret_key'
    SECRET_KEY = 'your_secret_key'
