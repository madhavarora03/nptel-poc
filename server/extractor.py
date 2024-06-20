import fitz  # PyMuPDF

# Function to extract text from the PDF
def extract_text_from_first_page(pdf_path):
    document = fitz.open(pdf_path)
    page = document[0]
    text = page.get_text()
    return text

# Main function
def main(pdf_path):
    text = extract_text_from_first_page(pdf_path)
    i = 0
    while text[i] != '\n':
        i += 1
    i += 1
    while text[i] != '\n':
        i += 1
    i += 1
    while text[i] != '\n':
        i += 1
    i += 1
    while text[i] != '\n':
        i += 1
    i += 1
    while text[i] != '\n':
        i += 1

    i += 1
    course_n = ""
    while text[i] != '\n':
        course_n += text[i]
        i += 1
    i += 1
    studentN = ""
    while text[i] != '\n':
        studentN += text[i]
        i += 1
    i += 1
    assignM = ""
    while text[i] != '\n':
        assignM += text[i]
        i += 1

    i += 1
    theoryM = ""
    while text[i] != '\n':
        theoryM += text[i]
        i += 1

    i += 1
    totalMarks = ""
    while text[i] != '\n':
        totalMarks += text[i]
        i += 1
    i += 1
    while text[i] != '\n':
        i += 1

    i += 1
    rolln = ""
    while text[i] != '\n':
        rolln += text[i]
        i += 1
    i = i - 5

    return course_n, studentN, assignM, theoryM, totalMarks, rolln
    # print(f"Course name : {course_n}")
    # print(f"Student name : {studentN}")
    # print(f"Assignment marks : {assignM}")
    # print(f"Theory marks : {theoryM}")
    # print(f"Total marks : {totalMarks}")
    # print(f"Roll no. : {rolln}")

# # Replace 'your_pdf_path.pdf' with the path to your PDF file
# if __name__ == "__main__":
#     pdf_path = './Leadership and Team Effectiveness.pdf'  # Change this to the actual path of your PDF file
#     pdf_path2 = './ajit pom.pdf'
#     main(pdf_path)
#     print("\n")
#     main(pdf_path2)
