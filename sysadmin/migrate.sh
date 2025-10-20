#! /bin/bash

docker exec -it periscope pipenv run python manage.py makemigrations
docker exec -it periscope pipenv run python manage.py migrate