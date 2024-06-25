import os
from app.utils.extractor import extractor


def verify_file(file_name):
    (
        uploaded_course_name,
        uploaded_student_name,
        uploaded_total_marks,
        uploaded_roll_number,
    ) = extractor("./uploads/" + file_name)

    valid_course_name, valid_student_name, valid_total_marks, valid_roll_number = (
        extractor("./downloads/" + file_name)
    )

    if uploaded_course_name != valid_course_name:
        return "Course name mismatch", 500

    if uploaded_student_name != valid_student_name:
        return "Student name mismatch", 500

    if uploaded_total_marks != valid_total_marks:
        return "Total marks mismatch", 500

    if uploaded_roll_number != valid_roll_number:
        return "Roll number mismatch", 500

    os.remove("./downloads/" + file_name)

    return "Verification successful", 200
