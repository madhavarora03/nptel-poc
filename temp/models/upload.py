from datetime import datetime, timezone
from app.extensions import db


class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject_code = db.Column(db.String(50), nullable=False)
    subject_name = db.Column(db.String(150), nullable=False)
    course_coordinator = db.Column(db.String(100), nullable=False)
    student_name = db.Column(db.String(100), nullable=False)
    student_nsut_roll_number = db.Column(db.String(50), nullable=False)
    nptel_roll_number = db.Column(db.String(50))
    uploaded_file = db.Column(db.String(200))
    validation_status = db.Column(db.String(10), nullable=False)
    marks_obtained = db.Column(db.Float)
    result = db.Column(db.String(10))
    timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __repr__(self):
        return f'<Submission "{self.subject_name}" by {self.student_name}>'
