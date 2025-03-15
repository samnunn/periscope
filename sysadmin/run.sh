#! /bin/sh
docker compose -f compose.base.yaml up -d
./sysadmin/migrate.sh
./sysadmin/load_data.sh