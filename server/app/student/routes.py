from app.student import bp
from app.models import Student
from app.extensions import db
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token


@bp.route("/register", methods=["POST"])
def register_student():
    data = request.get_json()
    existing_student = Student.query.filter_by(email=data["email"]).first()
    if existing_student:
        return jsonify({"error": "Email already exists"}), 400

    existing_student = Student.query.filter_by(
        nsut_roll_number=data["nsut_roll_number"]
    ).first()
    if existing_student:
        return jsonify({"error": "Student with this roll number already exists"}), 400

    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")
    new_student = Student(
        name=data["name"],
        email=data["email"],
        nsut_roll_number=data["nsut_roll_number"],
        password=hashed_password,
    )
    db.session.add(new_student)
    db.session.commit()
    return (
        jsonify(
            {
                "message": "Student registered successfully",
                "student": {
                    "name": new_student.name,
                    "email": new_student.email,
                    "nsut_roll_number": new_student.nsut_roll_number,
                },
            }
        ),
        201,
    )


@bp.route("/login", methods=["POST"])
def login_student():
    data = request.get_json()
    student = Student.query.filter_by(email=data["email"]).first()
    if not student or not check_password_hash(student.password, data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401
    access_token = create_access_token(
        identity={
            # "id": student.id,
            "email": student.email,
            "role": "student",
            "student_id": student.nsut_roll_number,
            "name": student.name,
        }
    )
    return jsonify({"access_token": access_token}), 200
