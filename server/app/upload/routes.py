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
    if file.filename == "":
        return jsonify({"error": "No selected file"})

    file_path = os.path.join(
        "uploads",
        file.filename.split(".")[0] + "-" + str(random.randint(1000, 10000)) + ".pdf",
    )
    file.save(file_path)

    thread = threading.Thread(target=process_file_async, args=(file_path,))
    thread.start()

    return jsonify({"message": "File uploaded successfully!"})
