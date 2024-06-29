from app.request import bp
from flask import request, jsonify
from app.models.request import Request
from app.extensions import db
from sqlalchemy import func, case


@bp.route("/", methods=["GET"])
def index():
    results = (
        db.session.query(
            Request.subject_code,
            Request.subject_name,
            func.count(Request.id).label("total_students"),
            func.sum(case((Request.request_status == "verified", 1), else_=0)).label(
                "verified"
            ),
            func.sum(
                case((Request.request_status == "not_verified", 1), else_=0)
            ).label("not_verified"),
            func.sum(case((Request.is_uploaded == False, 1), else_=0)).label(
                "not_submitted"
            ),
        )
        .group_by(Request.subject_code, Request.subject_name)
        .all()
    )

    response_data = []
    for row in results:
        response_data.append(
            {
                "subject_code": row.subject_code,
                "subject_name": row.subject_name,
                "total_students": row.total_students,
                "verified": row.verified,
                "not_verified": row.not_verified,
                "not_submitted": row.not_submitted,
            }
        )

    print(response_data)

    return jsonify(response_data)


@bp.route("/<subject_code>", methods=["GET"])
def index_route(subject_code):
    print(subject_code)

    all_requests = Request.query.filter_by(
        subject_code=subject_code, course_coordinator="Dr. John Doe"
    ).all()

    return jsonify(
        {
            "requests": [
                {
                    "student_name": request.student_name,
                    "student_nsut_roll_number": request.student_nsut_roll_number,
                    "subject_name": request.subject_name,
                    "course_coordinator": request.course_coordinator,
                    "status": request.request_status,
                    "nptel_roll_number": request.nptel_roll_number,
                    "total_marks": request.total_marks,
                    "result": (
                        "Pending"
                        if request.total_marks == ""
                        else "Pass" if int(request.total_marks) >= 40 else "Fail"
                    ),
                }
                for request in all_requests
            ]
        }
    )
