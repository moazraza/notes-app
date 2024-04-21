import os
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
POST_UPLOADED_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images\\notes_images")
ICON_UPLOADED_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images\\icon")
print(POST_UPLOADED_FILE_PATH)