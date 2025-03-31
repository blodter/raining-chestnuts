from datetime import datetime

from celery import shared_task
from celery.schedules import crontab
from dateutil.relativedelta import relativedelta

from app import models as app_models
from app.celery import app
from app.functions import get_current_weather, get_historical_weather


@app.on_after_finalize.connect
def setup_periodic_tasks(sender, **_):
    sender.add_periodic_task(
        crontab(minute='*/5'),
        update_weather_data.s(),
    )
    update_weather_data.delay()


@shared_task
def update_weather_data():
    """
    Fetches weather every 5 minutes to collect weather and prevent making more calls than necessary to weather API.
    """
    print("Updating weather data...")
    for national_park in app_models.NationalPark.objects.all():
        # Get current weather
        current_weather = get_current_weather(national_park.latitude, national_park.longitude)
        
        # Get historical weather
        now = datetime.now()
        # 10 years ago
        now_10_years_str = (now - relativedelta(years=10)).strftime("%Y-%m-%d")
        historical_weather_10 = get_historical_weather(
            national_park.latitude,
            national_park.longitude,
            start_date=now_10_years_str,
            end_date=now_10_years_str,
        )
        # 20 years ago
        now_20_years_str = (now - relativedelta(years=20)).strftime("%Y-%m-%d")
        historical_weather_20 = get_historical_weather(
            national_park.latitude,
            national_park.longitude,
            start_date=now_20_years_str,
            end_date=now_20_years_str,
        )
        # 30 years ago
        now_30_years_str = (now - relativedelta(years=30)).strftime("%Y-%m-%d")
        historical_weather_30 = get_historical_weather(
            national_park.latitude,
            national_park.longitude,
            start_date=now_30_years_str,
            end_date=now_30_years_str,
        )
        
        # Prepare the data to be saved
        defaults = dict(
            current_temperature=current_weather['current']['temperature_2m'],
            mean_daily_temperature=current_weather['daily']['temperature_2m_mean'][0],
            historical_mean_temp_10=historical_weather_10['daily']['temperature_2m_mean'][0],
            historical_mean_temp_20=historical_weather_20['daily']['temperature_2m_mean'][0],
            historical_mean_temp_30=historical_weather_30['daily']['temperature_2m_mean'][0],
        )
        defaults.update(
            change_today_to_10=defaults['mean_daily_temperature'] - defaults['historical_mean_temp_10'],
            change_10_to_20=defaults['historical_mean_temp_10'] - defaults['historical_mean_temp_20'],
            change_20_to_30=defaults['historical_mean_temp_20'] - defaults['historical_mean_temp_30'],
        )
        
        # Update or create the weather data for the national park
        app_models.Weather.objects.update_or_create(
            national_park=national_park,
            defaults=defaults
        )
    print('Weather data updated successfully!')
