docker exec -it periscope pipenv run python manage.py dumpdata\
    --exclude=auth\
    --exclude=contenttypes\
    --output clinic/fixtures/default_data.json