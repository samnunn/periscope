FROM ghcr.io/astral-sh/uv:python3.13-alpine

# mkdir
WORKDIR /app

# Copy the Pipfile to the container
COPY uv.lock /app
COPY pyproject.toml /app
COPY .python-version /app

# Install the dependencies using pipenv
RUN uv sync --locked

# Copy all the files required to run the Flask app
COPY . /app

# Expose the port and set the command
EXPOSE 8070

# Run
CMD ["uv", "run", "main.py"]