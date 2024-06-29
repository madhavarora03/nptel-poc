from flask import Flask, jsonify
from flask_cors import CORS
import os
from flask_jwt_extended import jwt_required, get_jwt_identity
from config import Config
from app.extensions import db, jwt


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)
jwt.init_app(app)

os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

from app.student import bp as student_bp

app.register_blueprint(student_bp, url_prefix="/student")

from app.teacher import bp as teacher_bp

app.register_blueprint(teacher_bp, url_prefix="/teacher")


@app.route("/current-user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    print(current_user)

    if current_user["role"] == "student":
        return jsonify(
            {
                "email": current_user["email"],
                "role": current_user["role"],
                "student_id": current_user["student_id"],
            }
        )
    return jsonify(
        {
            "email": current_user["email"],
            "role": current_user["role"],
            "teacher_id": current_user["teacher_id"],
        }
    )
