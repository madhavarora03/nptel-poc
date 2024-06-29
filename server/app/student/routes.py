from flask import request, jsonify
from app.student import bp
from app.extensions import db
from app.models.request import Request


@bp.route("/", methods=["GET"])
def index():
    print(request.args.get("roll_no"))
    results = (
        Request.query.filter(
            Request.request_status == "pending",
            Request.student_nsut_roll_number == request.args.get("roll_no"),
        )
        .with_entities(
            Request.subject_code,
            Request.subject_name,
            Request.course_coordinator,
            Request.is_uploaded,
        )
        .all()
    )

    response_data = []
    for row in results:
        response_data.append(
            {
                "subject_code": row.subject_code,
                "subject_name": row.subject_name,
                "coordinator": row.course_coordinator,
                "due_date": "2020-12-31",
            }
        )

    return jsonify(response_data)


@bp.route("/complete", methods=["GET"])
def index_route():
    print(request.args.get("roll_no"))
    results = (
        Request.query.filter(
            Request.request_status != "pending",
            Request.student_nsut_roll_number == request.args.get("roll_no"),
        )
        .with_entities(
            Request.subject_code,
            Request.subject_name,
            Request.course_coordinator,
            Request.is_uploaded,
            Request.request_status,
        )
        .all()
    )

    response_data = []
    for row in results:
        response_data.append(
            {
                "subject_code": row.subject_code,
                "subject_name": row.subject_name,
                "coordinator": row.course_coordinator,
                "status": row.request_status,
                "submitted_on": "2024-7-15",
                "due_date": "2024-7-31",
            }
        )

    return jsonify(response_data)
