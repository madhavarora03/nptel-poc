from flask import Flask, request, render_template, jsonify, send_file
import os
from pdf_qr_extractor import extract_link_from_pdf_qr_code
import requests
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from extractor import main


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file and file.filename.endswith('.pdf'):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], "uploaded.pdf")
        file.save(file_path)
        qr_code_link = extract_link_from_pdf_qr_code(file_path, page_number=0)

        download_pdf(qr_code_link)

        verify_file()

        return jsonify({'link': qr_code_link})
    return jsonify({'error': 'Invalid file type'})

@app.route('/download_pdf', methods=['POST'])
def download_pdf(qr_code_link):
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)

    try:
        # Step 1: Navigate to the URL obtained from the QR code
        driver.get(qr_code_link)
        print("Navigated to the QR code link")

        # Step 2: Wait for the "Course Certificate" button to be present and extract its href attribute
        wait = WebDriverWait(driver, 10)  # Increased wait time
        try:
            course_certificate_button = wait.until(EC.presence_of_element_located((By.XPATH, "//a[text()='Course Certificate']")))
            pdf_url = course_certificate_button.get_attribute('href')
            print(f"Extracted PDF URL: {pdf_url}")
        except Exception as e:
            print(f"Error finding the 'Course Certificate' button: {e}")
            print(driver.page_source)  # Print page source for debugging
            return "Error finding the 'Course Certificate' button", 500

        # Step 3: Download the PDF
        pdf_response = requests.get(pdf_url)
        if pdf_response.status_code == 200:
            # Save the PDF to a local folder
            local_folder = 'downloads'  # Local folder within the Flask project
            if not os.path.exists(local_folder):
                os.makedirs(local_folder)

            pdf_filename = os.path.join(local_folder, 'downloaded_certificate.pdf')

            with open(pdf_filename, 'wb') as pdf_file:
                pdf_file.write(pdf_response.content)

            print(f"PDF successfully downloaded and saved to {pdf_filename}")

            return send_file(pdf_filename, as_attachment=True)
        else:
            print(f"Failed to download PDF. Status code: {pdf_response.status_code}")
            return "Failed to download PDF", 500
        
    finally:
        driver.quit()


UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def verify_file():
    course_n_u, studentN_u, assignM_u, theoryM_u, totalMarks_u, rolln_u = main("./uploads/uploaded.pdf")
    
    course_n, studentN, assignM, theoryM, totalMarks, rolln=main("./downloads/downloaded_certificate.pdf")
    if(course_n == course_n_u and studentN == studentN_u and totalMarks==totalMarks_u and rolln == rolln_u):
        print("verified")
        return f'VERIFIED'
    else:
        print("not verified")
        return f'<b>NOT VERIFIED</b><br><b>Downloaded</b><br> Course Name: {course_n}<br>student name: {studentN}<br>assignment marks: {assignM}<br>theory marks: {theoryM}<br>Total Marks: {totalMarks}<br>{rolln}<br><br> <b>Uploaded</b><br>Course Name: {course_n_u}<br>student name: {studentN_u}<br>assignment marks: {assignM_u}<br>theory marks: {theoryM_u}<br>Total Marks: {totalMarks_u}<br>{rolln_u}'

if __name__ == '__main__':
    app.run(debug=True)