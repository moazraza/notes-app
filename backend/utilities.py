from datetime import datetime
import os
from config import POST_UPLOADED_FILE_PATH,ICON_UPLOADED_FILE_PATH,ALLOWED_EXTENSIONS
import secrets
import base64


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_random_filename(original_filename):
    _, extension = os.path.splitext(original_filename)
    random_name = secrets.token_hex(8)
    return f"{random_name}{extension}"

def upload_files(file,tag):
    try:
        if not allowed_file(file.filename):
            raise Exception("File type not allowed_1")
        timestamp = datetime.now().timestamp()
        original_filename = file.filename
        random_filename = generate_random_filename(original_filename)
        new_filename = f"{int(timestamp)}_{random_filename}"
        if tag == "notes":
            upload_path = os.path.join(POST_UPLOADED_FILE_PATH, new_filename)
        elif tag == "icon":
            upload_path = os.path.join(ICON_UPLOADED_FILE_PATH, new_filename)
        else:
            upload_path = ""
        # image_base64 = base64.b64encode(file.read()).decode('utf-8')
        # print(image_base64)
        file.save(upload_path)
        return new_filename, original_filename
    except Exception as e:
        return False
