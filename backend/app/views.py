from rest_framework import generics

from app import (
    filters as app_filters,
    models as app_models,
    serializers as app_serializers,
)


class NationalParkList(generics.ListAPIView):
    """
    Lists all national parks.
    """
    queryset = app_models.NationalPark.objects.all()
    serializer_class = app_serializers.NationalParkSerializer
    filterset_class = app_filters.NationalParkFilter
    ordering = ('name',)


class NationalParkDetails(generics.RetrieveAPIView):
    """
    Retrieves a national park by ID.
    """
    queryset = app_models.NationalPark.objects.all()
    serializer_class = app_serializers.NationalParkSerializer


class WeatherList(generics.ListAPIView):
    """
    Lists all weather data.
    """
    queryset = app_models.Weather.objects.all()
    serializer_class = app_serializers.WeatherSerializer
    filterset_class = app_filters.WeatherFilter
    ordering = ('national_park__name',)


class WeatherDetails(generics.RetrieveAPIView):
    """
    Retrieves weather data by ID.
    """
    queryset = app_models.Weather.objects.all()
    serializer_class = app_serializers.WeatherSerializer
