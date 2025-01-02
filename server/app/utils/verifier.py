import os
from app.utils.extractor import extractor
from app.models import StudentSubject
from app.models import StudentSubject, Subject
from app.extensions import db
from app import app


def update_status_to_not_verified(student_subject_id):
    with app.app_context():
        student_subject = StudentSubject.query.filter_by(id=student_subject_id).first()
        if student_subject:
            student_subject.status = "not_verified"
            db.session.commit()


def verify_file(file_name, student_subject_id, current_user_name, subject_code):
    file_name = os.path.basename(file_name)
    with app.app_context():
        subject = Subject.query.filter_by(subject_code=subject_code).first()
        subject_name = subject.subject_name
    (
        uploaded_course_name,
        uploaded_student_name,
        uploaded_total_marks,
        uploaded_roll_number,
    ) = extractor("./uploads/" + file_name)

    valid_course_name, valid_student_name, valid_total_marks, valid_roll_number = (
        extractor("./downloads/" + file_name)
    )

    os.remove("./downloads/" + file_name)
    os.remove("qr_code_image.png")

    if (
        uploaded_course_name == None
        or uploaded_student_name == None
        or uploaded_total_marks == None
        or uploaded_roll_number == None
    ):
        return "Invalid PDF uploaded", 500, None, None

    if (uploaded_course_name.lower() != valid_course_name.lower()) or (
        uploaded_course_name.lower() != subject_name.lower()
    ):
        update_status_to_not_verified(student_subject_id)
        return "Course name mismatch", 500, None, None

    if (uploaded_student_name.lower() != valid_student_name.lower()) or (
        uploaded_student_name.lower() != current_user_name.lower()
    ):
        update_status_to_not_verified(student_subject_id)
        return "Student name mismatch", 500, None, None

    if uploaded_total_marks != valid_total_marks:
        update_status_to_not_verified(student_subject_id)
        return "Total marks mismatch", 500, None, None

    if uploaded_roll_number != valid_roll_number:
        update_status_to_not_verified(student_subject_id)
        return "Roll number mismatch", 500, None, None

    return (
        "Verification successful",
        200,
        valid_roll_number,
        valid_total_marks,
    )
