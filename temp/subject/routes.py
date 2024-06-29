from app.subject import bp
from flask import request, jsonify
from app.utils.csv_reader import read_csv_to_list as csv_reader
import os
import threading
from app.utils import process_csv_upload


@bp.route("/", methods=["POST"])
def index():
    print(
        request.form["subject_code"],
        request.form["subject_name"],
        request.form["due_date"],
        request.form["coordinator"],
        request.files["csv_file"],
    )
    file = request.files["csv_file"]
    subject_code = request.form["subject_code"]
    subject_name = request.form["subject_name"]
    course_coordinator = request.form["coordinator"]

    file_name = request.files["csv_file"].filename

    file.save(file_name)

    thread = threading.Thread(
        target=process_csv_upload,
        args=(
            file_name,
            subject_code,
            subject_name,
            course_coordinator,
        ),
    )
    thread.start()

    return jsonify({"message": "Hello, World!"})
