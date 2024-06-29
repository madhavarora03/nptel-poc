from app.subject import bp
from flask import request, jsonify
import threading
from app.utils import process_csv_upload
from flask_jwt_extended import jwt_required, get_jwt_identity


@bp.route("/", methods=["POST"])
@jwt_required
def index():
    current_user = get_jwt_identity()

    if current_user["role"] != "teacher":
        return jsonify({"message": "Not a teacher"}), 403

    file = request.files["csv_file"]
    
    subject_code = request.form["subject_code"]
    subject_name = request.form["subject_name"]
    course_coordinator = current_user["id"]
    due_date = request.form["due_date"]

    file_name = request.files["csv_file"].filename

    file.save(file_name)

    thread = threading.Thread(
        target=process_csv_upload,
        args=(
            file_name,
            subject_code,
            subject_name,
            course_coordinator,
            due_date,
        ),
    )
    thread.start()

    return jsonify({"message": "Hello, World!"})
