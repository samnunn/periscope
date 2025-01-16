#!/bin/bash

echo "Downloading test browsers..."
pipenv run playwright install chromium webkit

echo "Starting containers..."
docker compose -f compose.test.yaml up -d

# echo "Waiting for server to be ready..."
# sleep 10

echo "Running tests..."
pipenv run pytest --browser webkit --browser chromium tests/ -v

echo "Cleaning up..."
docker compose -f compose.test.yaml down