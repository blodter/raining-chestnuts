from rest_framework import serializers

from app import models as app_models


class BaseWeatherSerializer(serializers.ModelSerializer):
    """
    Base serializer for the Weather model.
    """
    class Meta:
        model = app_models.Weather
        fields = '__all__'


class NationalParkSerializer(serializers.ModelSerializer):
    """
    Serializer for the NationalPark model (also serializes the related Weather).
    """
    weather = BaseWeatherSerializer(many=False)
    
    class Meta:
        model = app_models.NationalPark
        fields = '__all__'


class WeatherSerializer(serializers.ModelSerializer):
    """
    Serializer for the Weather model (also serializes the related NationalPark).
    """
    national_park = NationalParkSerializer(many=False)
    
    class Meta:
        model = app_models.Weather
        fields = '__all__'
        depth = 1
