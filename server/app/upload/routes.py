import threading
from flask import request, jsonify
from app.upload import bp
import os
import random
from app.utils import process_file_async
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import StudentSubject
from app.extensions import db


@bp.route("", methods=["POST"])
@jwt_required()
def index():
    current_user = get_jwt_identity()
    if current_user["role"] != "student":
        return jsonify({"message": "Not a student"}), 403

    if "file" not in request.files:
        return jsonify({"message": "No file part"}), 400

    subject_code = request.args.get("subject_code")
    if not subject_code:
        return jsonify({"message": "Subject code not provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"message": "No selected file"})

    file_path = os.path.join(
        "uploads",
        file.filename.split(".")[0]
        + "-"
        + str(random.randint(100000, 1000000))
        + ".pdf",
    )

    file.save(file_path)
    print(f"File saved to {file_path}")

    StudentSubject.query.filter_by(
        student_id=current_user["student_id"], subject_id=subject_code
    ).update({"status": "processing"})

    db.session.commit()

    ss = StudentSubject.query.filter_by(
        student_id=current_user["student_id"], subject_id=subject_code
    ).first()

    thread = threading.Thread(
        target=process_file_async,
        args=(file_path, ss.id, current_user["name"], subject_code),
    )
    thread.start()

    return jsonify({"message": "File uploaded successfully!"})
