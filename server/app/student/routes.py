from app.student import bp
from app.models import Student
from app.extensions import db
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import StudentSubject, Subject, Teacher, Upload
from sqlalchemy import desc


@bp.route("/register", methods=["POST"])
def register_student():
    data = request.get_json()
    existing_student = Student.query.filter_by(email=data["email"]).first()
    if existing_student:
        return jsonify({"message": "Email already exists"}), 400

    existing_student = Student.query.filter_by(
        nsut_roll_number=data["nsut_roll_number"]
    ).first()
    if existing_student:
        return jsonify({"message": "Student with this roll number already exists"}), 400

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
            "email": student.email,
            "role": "student",
            "student_id": student.nsut_roll_number,
            "name": student.name,
        }
    )
    return jsonify({"access_token": access_token}), 200


@bp.route("/pending", methods=["GET"])
@jwt_required()
def get_pending_requests():
    current_user = get_jwt_identity()
    if current_user["role"] != "student":
        return jsonify({"message": "Not a student"}), 403

    student_subjects = StudentSubject.query.filter_by(
        student_id=current_user["student_id"], status="pending"
    ).all()

    result = []
    for student_subject in student_subjects:
        subject = Subject.query.filter_by(
            subject_code=student_subject.subject_id
        ).first()
        teacher = Teacher.query.filter_by(teacher_id=subject.teacher_id).first()
        result.append(
            {
                "subject_code": student_subject.subject_id,
                "subject_name": subject.subject_name,
                "coordinator": teacher.name,
                "due_date": subject.due_date.strftime("%d/%m/%Y"),
                "status": student_subject.status,
            }
        )

    print("Result: ", result)

    return jsonify({"student_subjects": result})


@bp.route("/completed", methods=["GET"])
@jwt_required()
def get_completed_requests():
    current_user = get_jwt_identity()
    if current_user["role"] != "student":
        return jsonify({"message": "Not a student"}), 403

    student_subjects = StudentSubject.query.filter(
        StudentSubject.student_id == current_user["student_id"],
        StudentSubject.status != "pending",
    ).all()

    result = []
    for student_subject in student_subjects:
        subject = Subject.query.filter_by(
            subject_code=student_subject.subject_id
        ).first()
        upload = (
            Upload.query.filter_by(student_subject_id=student_subject.id)
            .order_by(desc(Upload.timestamp))
            .first()
        )
        teacher = Teacher.query.filter_by(teacher_id=subject.teacher_id).first()
        result.append(
            {
                "subject_code": student_subject.subject_id,
                "subject_name": subject.subject_name,
                "coordinator": teacher.name,
                "status": student_subject.status,
                "remark": student_subject.remark,
                "submitted_on": (
                    upload.timestamp.strftime("%d/%m/%Y") if upload else None
                ),
                "due_date": subject.due_date.strftime("%d/%m/%Y"),
            }
        )

    return jsonify({"student_subjects": result})
