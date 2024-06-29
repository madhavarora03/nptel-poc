from app.teacher import bp
from app.models import Teacher
from app.extensions import db
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token


@bp.route("/register", methods=["POST"])
def register_teacher():
    data = request.get_json()

    existing_teacher = Teacher.query.filter_by(email=data["email"]).first()
    if existing_teacher:
        return jsonify({"error": "Email already exists"}), 400

    existing_teacher = Teacher.query.filter_by(teacher_id=data["teacher_id"]).first()
    if existing_teacher:
        return jsonify({"error": "Teacher with this teacher id already exists"}), 400

    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")
    new_teacher = Teacher(
        name=data["name"],
        email=data["email"],
        teacher_id=data["teacher_id"],
        password=hashed_password,
    )
    db.session.add(new_teacher)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Teacher registered successfully",
                "teacher": {
                    "name": new_teacher.name,
                    "email": new_teacher.email,
                    "teacher_id": new_teacher.teacher_id,
                },
            }
        ),
        201,
    )


@bp.route("/login", methods=["POST"])
def login_teacher():
    data = request.get_json()
    teacher = Teacher.query.filter_by(email=data["email"]).first()
    if not teacher or not check_password_hash(teacher.password, data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity={
            # "id": teacher.id,
            "email": teacher.email,
            "role": "teacher",
            "teacher_id": teacher.teacher_id,
            "name": teacher.name,
        }
    )
    return jsonify({"access_token": access_token}), 200
