from app.subject import bp
from flask import request, jsonify


@bp.route("/", methods=["POST"])
def index():
    print(
        request.form["subject_code"],
        request.form["subject_name"],
        request.form["due_date"],
        request.form["coordinator"],
    )

    return jsonify({"message": "Hello, World!"})
