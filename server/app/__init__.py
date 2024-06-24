from flask import Flask
from flask_cors import CORS
import os

from config import Config
from app.extensions import db


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    db.init_app(app)
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    from app.upload import bp as upload_bp

    app.register_blueprint(upload_bp, url_prefix="/upload")

    return app
