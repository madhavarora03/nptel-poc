from app.teacher import bp
from app.models import Teacher, Subject, StudentSubject
from app.extensions import db
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


@bp.route("/register", methods=["POST"])
def register_teacher():
    data = request.get_json()

    existing_teacher = Teacher.query.filter_by(email=data["email"]).first()
    if existing_teacher:
        return jsonify({"message": "Email already exists"}), 400

    existing_teacher = Teacher.query.filter_by(teacher_id=data["teacher_id"]).first()
    if existing_teacher:
        return jsonify({"message": "Teacher with this teacher id already exists"}), 400

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
            "email": teacher.email,
            "role": "teacher",
            "teacher_id": teacher.teacher_id,
            "name": teacher.name,
        }
    )
    return jsonify({"access_token": access_token}), 200


@bp.route("/alloted-subjects", methods=["GET"])
@jwt_required()
def get_alloted_subjects():
    current_user = get_jwt_identity()
    if (role := current_user.get("role")) != "teacher":
        return jsonify({"message": "Not a teacher"}), 403

    teacher_subjects = Subject.query.filter_by(
        teacher_id=current_user["teacher_id"]
    ).all()

    subjects = []
    for subject in teacher_subjects:
        total_students = StudentSubject.query.filter_by(
            subject_id=subject.subject_code
        ).count()
        verified = StudentSubject.query.filter_by(
            subject_id=subject.subject_code, status="verified"
        ).count()
        not_verified = StudentSubject.query.filter_by(
            subject_id=subject.subject_code, status="not_verified"
        ).count()
        not_submitted = total_students - (verified + not_verified)

        subjects.append(
            {
                "subject_code": subject.subject_code,
                "subject_name": subject.subject_name,
                "due_date": subject.due_date.strftime("%d/%m/%Y"),
                "total_students": total_students,
                "verified": verified,
                "not_verified": not_verified,
                "not_submitted": not_submitted,
            }
        )

    return jsonify({"subjects": subjects})


@bp.route("/request/<subject_code>", methods=["GET"])
@jwt_required()
def get_student_requests(subject_code):
    current_user = get_jwt_identity()
    if current_user["role"] != "teacher":
        return jsonify({"message": "Not a teacher"}), 403

    subject = Subject.query.filter_by(
        subject_code=subject_code, teacher_id=current_user["teacher_id"]
    ).first()
    if not subject:
        return (
            jsonify({"message": "Subject not found or not assigned to this teacher"}),
            404,
        )

    student_subjects = StudentSubject.query.filter_by(subject_id=subject_code).all()

    student_requests = [
        {
            "student_name": ss.student.name,
            "student_nsut_roll_number": ss.student.nsut_roll_number,
            "nptel_roll_number": ss.nptel_roll_number,
            "total_marks": ss.total_marks,
            "result": ss.result,
            "status": ss.status,
        }
        for ss in student_subjects
    ]

    return jsonify({"requests": student_requests})
