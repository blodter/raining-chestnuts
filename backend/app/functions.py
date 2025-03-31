from typing import Dict, Any

import requests
from django.conf import settings


def get_current_weather(latitude: float, longitude: float) -> Dict[str, Any]:
    """
    Fetches the current weather data for a given latitude and longitude using Open Meteo API.
    """
    params = {
        'latitude': latitude,
        'longitude': longitude,
        'daily': 'temperature_2m_mean',
        'current': 'temperature_2m'
    }
    response = requests.get(f'{settings.OPEN_METEO_CURRENT_URL}forecast', params=params)
    response.raise_for_status()
    return response.json()


def get_historical_weather(latitude: float, longitude: float, start_date: str, end_date: str) -> Dict[str, Any]:
    """
    Fetches historical weather data for a given latitude and longitude using Open Meteo API.
    """
    params = {
        'latitude': latitude,
        'longitude': longitude,
        'start_date': start_date,
        'end_date': end_date,
        'daily': 'temperature_2m_mean',
    }
    response = requests.get(f'{settings.OPEN_METEO_HISTORICAL_URL}archive', params=params)
    response.raise_for_status()
    return response.json()
