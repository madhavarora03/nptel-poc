from app.utils.qr_extraction import extract_link
from app.utils.downloader import download_verification_pdf
from app.utils.verifier import verify_file as verify


def process_file_async(file_path):
    verification_link = extract_link(file_path, 0)
    print("Verification Link:", verification_link)

    _, status = download_verification_pdf(verification_link, file_path.split("/")[-1])

    if status == 500:
        print("Failed to download the PDF")
        return

    verification_status, status = verify(file_path.split("/")[-1])

    print(verification_status)

    return verification_status, status
