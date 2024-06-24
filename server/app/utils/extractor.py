import fitz


def extract_text_from_first_page(pdf_path):
    document = fitz.open(pdf_path)
    page = document[0]
    text = page.get_text()
    return text


def extractor(pdf_path):
    text = extract_text_from_first_page(pdf_path)
    lines = text.splitlines()

    print("Extracted lines:")
    for i, line in enumerate(lines):
        print(f"Line {i}: {line}")

    course_name = lines[5].strip()
    student_name = lines[6].strip()
    assignment_marks = lines[7].strip()
    exam_marks = lines[8].strip()
    total_marks = lines[9].strip()
    roll_no = lines[11].strip()

    return (
        course_name,
        student_name,
        total_marks,
        roll_no,
    )
