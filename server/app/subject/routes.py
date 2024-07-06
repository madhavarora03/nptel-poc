from app.subject import bp
from flask import request, jsonify
from app.utils import process_csv_upload
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Subject
from app.extensions import db
from datetime import datetime


@bp.route("/", methods=["POST"])
@jwt_required()
def index():
    current_user = get_jwt_identity()

    if current_user["role"] != "teacher":
        return jsonify({"message": "Not a teacher"}), 403

    # Add new subject
    is_subject_existing = Subject.query.filter_by(
        subject_code=request.form["subject_code"]
    ).first()

    if is_subject_existing:
        return jsonify({"message": "Subject already exists"}), 400

    # Convert due_date from string to datetime object
    due_date = request.form["due_date"]
    try:
        due_date = datetime.strptime(due_date, "%Y-%m-%d")
    except ValueError:
        return jsonify({"message": "Invalid date format. Use YYYY-MM-DD"}), 400

    new_subject = Subject(
        subject_code=request.form["subject_code"],
        subject_name=request.form["subject_name"],
        teacher_id=current_user["teacher_id"],
        due_date=due_date,
    )
    db.session.add(new_subject)
    db.session.commit()

    # Save csv file
    file = request.files["csv_file"]

    subject_code = request.form["subject_code"]
    subject_name = request.form["subject_name"]
    course_coordinator = current_user["teacher_id"]
    due_date = request.form["due_date"]

    file_name = request.files["csv_file"].filename

    file.save(file_name)

    # Add students to the subject
    process_csv_upload(file_name, subject_code),

    return jsonify({"message": "File uploaded successfully"})
