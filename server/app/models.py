from datetime import datetime, timezone
from app.extensions import db


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    name = db.Column(db.String, nullable=False)
    nsut_roll_number = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)


class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    name = db.Column(db.String, nullable=False)
    teacher_id = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)


class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    subject_code = db.Column(db.String, unique=True, nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey("teacher.id"), nullable=False)
    subject_name = db.Column(db.String, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)

    teacher = db.relationship("Teacher", backref=db.backref("subjects", lazy=True))


class StudentSubject(db.Model):
    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    student_id = db.Column(db.Integer, db.ForeignKey("student.id"), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey("subject.id"), nullable=False)
    status = db.Column(
        db.Enum(
            "pending", "verified", "not_verified", "processing", name="status_enum"
        ),
        nullable=False,
    )
    result = db.Column(db.Enum("passed", "failed", name="result_enum"), nullable=False)
    total_marks = db.Column(db.Integer, nullable=False)

    student = db.relationship(
        "Student", backref=db.backref("student_subjects", lazy=True)
    )
    subject = db.relationship(
        "Subject", backref=db.backref("student_subjects", lazy=True)
    )


class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    student_subject_id = db.Column(
        db.Integer, db.ForeignKey("student_subject.id"), nullable=False
    )
    file_path = db.Column(db.String, nullable=False)
    timestamp = db.Column(
        db.DateTime, default=datetime.now(timezone.utc), nullable=False
    )

    student_subject = db.relationship(
        "StudentSubject", backref=db.backref("uploads", lazy=True)
    )
