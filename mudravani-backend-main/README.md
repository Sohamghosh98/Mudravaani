## Steps to implement ml part : -

1. cd fastapi_project (or the folder u made)
2. make virtual env | actiave : python -m venv venv | venv/Scripts/actiavte
3. pip install -r requirements.txt
4. go to rotues / video_routes.py | uncomment and paste your ml code and make apis
5. Then go to main.py and uncomment video routes
6. To run this : uvicorn app.main:app --host 0.0.0.0 --port 5000
7. config.py used for importing all env, check it

## Steps to implement google auth part: -

1. All the google auth credentials are set up in .env and config.py
2. google auth part commented in routes / auth_routes.py
