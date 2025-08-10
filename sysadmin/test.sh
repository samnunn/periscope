#!/bin/bash

echo "Downloading test browsers..."
uv tool run playwright install chromium webkit

echo "Starting containers..."
# docker compose -f compose.test.yaml up -d

# echo "Waiting for server to be ready..."
# sleep 10

echo "Running tests..."
uv tool run --with playwright --with pytest-playwright --with pytest-xdist pytest --numprocesses 4 --browser webkit --browser chromium tests/ -v

echo "Cleaning up..."
# docker compose -f compose.test.yaml down