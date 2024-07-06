from datetime import datetime, timezone
from app.extensions import db


class Student(db.Model):
    nsut_roll_number = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)


class Teacher(db.Model):
    teacher_id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)


class Subject(db.Model):
    subject_code = db.Column(db.String, primary_key=True)
    subject_name = db.Column(db.String, nullable=False)
    teacher_id = db.Column(
        db.String, db.ForeignKey("teacher.teacher_id"), nullable=False
    )
    due_date = db.Column(db.DateTime, nullable=False)

    teacher = db.relationship("Teacher", backref=db.backref("subjects", lazy=True))


class StudentSubject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(
        db.String, db.ForeignKey("student.nsut_roll_number"), nullable=False
    )
    subject_id = db.Column(
        db.String, db.ForeignKey("subject.subject_code"), nullable=False
    )
    status = db.Column(
        db.Enum(
            "pending", "verified", "not_verified", "processing", name="status_enum"
        ),
        default="pending",
        nullable=False,
    )
    result = db.Column(
        db.Enum("passed", "failed", "pending", name="result_enum"), nullable=False
    )

    nptel_roll_number = db.Column(db.String)

    total_marks = db.Column(db.Integer)

    student = db.relationship(
        "Student", backref=db.backref("student_subjects", lazy=True)
    )
    subject = db.relationship(
        "Subject", backref=db.backref("student_subjects", lazy=True)
    )


class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_subject_id = db.Column(
        db.Integer, db.ForeignKey("student_subject.id"), nullable=False
    )
    file_path = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now, nullable=False)

    student_subject = db.relationship(
        "StudentSubject", backref=db.backref("uploads", lazy=True)
    )
