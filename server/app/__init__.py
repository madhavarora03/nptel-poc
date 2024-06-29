from flask import Flask
from flask_cors import CORS
import os

from config import Config
from app.extensions import db


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

from app.upload import bp as upload_bp

app.register_blueprint(upload_bp, url_prefix="/upload")

from app.student import bp as student_bp

app.register_blueprint(student_bp, url_prefix="/student")

from app.request import bp as request_bp

app.register_blueprint(request_bp, url_prefix="/request")

from app.subject import bp as subject_bp

app.register_blueprint(subject_bp, url_prefix="/subject")
