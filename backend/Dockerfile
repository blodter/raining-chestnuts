FROM python:3.13-slim AS base

RUN apt-get update && \
    apt-get install -y libpq-dev gcc && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app
WORKDIR /app

FROM base AS build
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV PYTHONPATH=/app

EXPOSE 8000

CMD ["/app/entrypoint.sh", "python", "manage.py", "runserver", "0.0.0.0:8000"]
