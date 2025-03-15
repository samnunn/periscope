#! /bin/sh
docker compose -f compose.base.yaml up --build -d
./sysadmin/migrate.sh
./sysadmin/load_data.sh