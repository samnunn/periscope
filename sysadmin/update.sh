#! /bin/sh
git pull git@github.com:samnunn/periscope.git
docker compose -f compose.base.yaml up --build -d
./sysadmin/migrate.sh
./sysadmin/load_data.sh