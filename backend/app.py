from app import create_app
from mongoengine import connect
app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
