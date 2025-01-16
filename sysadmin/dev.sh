#! /bin/sh
docker compose -f compose.base.yaml -f compose.dev.yaml up --watch --build