#!/bin/bash
set -e

# Ensure that required environment variables are set
: "${POSTGRES_SERVER:?Environment variable POSTGRES_SERVER is required}"
: "${POSTGRES_PORT:?Environment variable POSTGRES_PORT is required}"

echo "Waiting for PostgreSQL at ${POSTGRES_SERVER}:${POSTGRES_PORT}..."

# Loop until PostgreSQL is ready
while ! nc -z "$POSTGRES_SERVER" "$POSTGRES_PORT"; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - running migrations"
# Run database migrations
python manage.py makemigrations
python manage.py migrate
python manage.py makemigrations app
python manage.py migrate app
python manage.py load_initial_data

echo "Starting Django server..."
exec "$@"
