FROM python:3.11-slim

# Set the working directory to /app
WORKDIR /app

# Install pipenv
COPY Pipfile .
RUN pip install pipenv

# Install the dependencies using pipenv
RUN pipenv install

# Copy all the files required to run the Flask app
COPY www /app

# Expose the port and set the command
EXPOSE 8070

# The actual command to run
CMD ["sh", "-c", "$CMD"]