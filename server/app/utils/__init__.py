from app.utils.qr_extraction import extract_link
from app.utils.downloader import download_verification_pdf
from app.utils.verifier import verify_file as verify
from app.utils.csv_reader import read_csv_to_list as csv_reader
from app.models.request import Request
from app.models.upload import Upload
from app.extensions import db
from app import app


def process_file_async(file_path, subject_code, nsut_roll_no):
    verification_link = extract_link(file_path, 0)
    print("Verification Link:", verification_link)

    _, download_status = download_verification_pdf(
        verification_link, file_path.split("/")[-1]
    )

    if download_status == 500:
        print("Failed to download the PDF")
        return

    verification_status, status, nptel_roll_number, total_marks = verify(
        file_path.split("/")[-1]
    )

    with app.app_context():
        update_request = Request.query.filter_by(
            student_nsut_roll_number=nsut_roll_no,
            subject_code=subject_code,
        ).first()
        update_request.request_status = "verified" if status == 200 else "not verified"
        update_request.nptel_roll_number = nptel_roll_number if status == 200 else ""
        update_request.total_marks = str(total_marks) if status == 200 else ""
        update_request.is_uploaded = True

        db.session.commit()

        new_upload = Upload(
            subject_code=subject_code,
            subject_name=update_request.subject_name,
            course_coordinator=update_request.course_coordinator,
            student_name=update_request.student_name,
            student_nsut_roll_number=nsut_roll_no,
            validation_status=verification_status,
            nptel_roll_number=nptel_roll_number,
            marks_obtained=total_marks,
            uploaded_file=file_path,
            result="Pass" if int(total_marks) >= 40 else "Fail",
        )

        db.session.add(new_upload)
        db.session.commit()

    print(f"Added {nsut_roll_no} to the database")


def process_csv_upload(file_name, subject_code, subject_name, course_coordinator):
    student_list = csv_reader(file_name)

    for student in student_list:
        student_name = student["student_name"]
        nsut_roll_no = student["nsut_roll_no"]
        with app.app_context():
            new_request = Request(
                subject_code=subject_code,
                student_name=student_name,
                student_nsut_roll_number=nsut_roll_no,
                subject_name=subject_name,
                course_coordinator=course_coordinator,
            )
            db.session.add(new_request)
            db.session.commit()

            print(f"Added {student_name} to the database")

    print("sent to database succesfully")
