#! /bin/sh

git pull git@github.com:samnunn/periscope.git
docker compose -f compose.yaml build
./run.sh -d