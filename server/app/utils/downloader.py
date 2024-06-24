from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import requests
import os


def download_verification_pdf(qr_code_link, file_name):
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)

    try:
        driver.get(qr_code_link)
        print("Navigated to the QR code link")

        wait = WebDriverWait(driver, 10)
        try:
            course_certificate_button = wait.until(
                EC.presence_of_element_located(
                    (By.XPATH, "//a[text()='Course Certificate']")
                )
            )
            pdf_url = course_certificate_button.get_attribute("href")
            print(f"Extracted PDF URL: {pdf_url}")
        except Exception as e:
            print(f"Error finding the 'Course Certificate' button: {e}")
            print(driver.page_source)
            return "Error finding the 'Course Certificate' button", 500

        pdf_response = requests.get(pdf_url)
        if pdf_response.status_code == 200:
            local_folder = "downloads"

            if not os.path.exists(local_folder):
                os.makedirs(local_folder)

            pdf_filename = os.path.join(local_folder, file_name)

            with open(pdf_filename, "wb") as pdf_file:
                pdf_file.write(pdf_response.content)

            print(f"PDF successfully downloaded and saved to {pdf_filename}")

            return "Download successful!", 200
        else:
            print(f"Failed to download PDF. Status code: {pdf_response.status_code}")
            return "Failed to download PDF", 500

    finally:
        driver.quit()
