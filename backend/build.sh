#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input || echo "collectstatic warning, continuing..."
python manage.py migrate --no-input
python manage.py load_initial_data
python manage.py upload_media_to_cloudinary
