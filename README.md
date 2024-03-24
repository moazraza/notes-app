Intelligent-Sharing Notes App

## Development server for Flask

Go to the backend folder:
 - run `python -m venv venv`
 - On Windows `venv\Scripts\activate` or for macOS/Linux `source venv/bin/activate`
 - make sure the venv is activated, then run `pip install -r requirements.txt`
 - to exit the venv, run `deactivate`
 - run `.venv\Scripts\python.exe -m flask run`. Navigate to `http://localhost:5000/`.
 
To connect to the database, create a `.env` file in `backend` and add the following:
 - `MONGO_URI=mongodb+srv://<username>:<password>@notes-app.5zydcag.mongodb.net/notes?retryWrites=true&w=majority` where `<username>` and `<password>` are user specific

## Development server for Angular

Go to the frontend folder:
 - Make sure Angular CLI is installed from `https://angular.io/'
 - run `npm install` which will install all the dependencies listed in `package.json`.
 - run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
 
 

 
 