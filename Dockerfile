# Start with the python:3.9 image
FROM python:3.9
# Set the following enviroment variables
#
ENV REACT_APP_BASE_URL=https://tasky-capstone.herokuapp.com
ENV DATABASE_URL=postgres://magik_database_user:TRI0RAZyf8SgGvyYb40t8DwUdScexYZH@dpg-ch87sjg2qv2864rhb9f0-a/magik_database
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV SCHEMA=capstone_tasky
# REACT_APP_BASE_URL -> Your deployment URL
# FLASK_APP -> entry point to your flask app
# FLASK_ENV -> Tell flask to use the production server
# SQLALCHEMY_ECHO -> Just set it to true

# Set the directory for upcoming commands to /var/www
WORKDIR /var/www
# Copy all the files from your repo to the working directory
COPY . .
# Copy the built react app (it's built for us) from the
# /react-app/build/ directory into your flasks app/static directory
RUN apt-get update && apt-get upgrade -y && \
  apt-get install -y nodejs \
  npm

RUN npm install --prefix react-app && npm run build --prefix react-app && pip install -r requirements.txt && pip install psycopg2-binary && flask db upgrade && flask seed all
# Start the flask environment by setting our
# closing command to gunicorn app:app
CMD gunicorn app:app
