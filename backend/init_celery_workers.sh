#!/usr/bin/env bash
echo "Initializing Celery workers"
celery -A app worker -B
