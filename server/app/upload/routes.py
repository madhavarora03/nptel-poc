import threading
from flask import request, jsonify
from app.upload import bp
import os
import random
from app.utils import process_file_async


@bp.route("/", methods=["POST"])
def index():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files["file"]
    subject_code = request.form["subject_code"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})

    file_path = os.path.join(
        "uploads",
        file.filename.split(".")[0]
        + "-"
        + str(random.randint(100000, 1000000))
        + ".pdf",
    )
    file.save(file_path)
    print(f"File saved to {file_path}, subject code: {request.form['subject_code']}")

    thread = threading.Thread(
        target=process_file_async,
        args=(
            file_path,
            subject_code,
        ),
    )
    thread.start()

    return jsonify({"message": "File uploaded successfully!"})
