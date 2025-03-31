from django.db.models.expressions import RawSQL
from django_filters import FilterSet
from django_filters import filters

from app import models as app_models


class BaseFilter(FilterSet):
    def __new__(cls, model=None, *args, **kwargs):
        cls.Meta.model = model
        return super().__new__(cls, *args, **kwargs)
    
    class Meta:
        model = None
        fields = '__all__'


class NationalParkFilter(FilterSet):
    """
    Allows filtering of national parks by latitude, longitude, and radius.
    """
    latitude = filters.NumberFilter(method='filter_by_distance')
    longitude = filters.NumberFilter(method='filter_by_distance')
    radius = filters.NumberFilter(method='filter_by_distance')
    
    class Meta:
        model = app_models.NationalPark
        fields = '__all__'
    
    def filter_by_distance(self, queryset, name, value):
        lat_param = self.data.get('latitude', None)
        lng_param = self.data.get('longitude', None)
        if not lat_param or not lng_param:
            raise ValueError('Both latitude and longitude must be provided.')
        radius_param = self.data.get('radius', 100)
        
        try:
            latitude = float(lat_param)
            longitude = float(lng_param)
            radius = float(radius_param)
        except (ValueError, TypeError):
            raise ValueError('Latitude, longitude, and radius must be valid numbers.')
        
        return queryset.annotate(
            distance=RawSQL(
                """
                    3959 * acos(
                        cos(radians(%s)) * cos(radians(latitude)) * cos(radians(longitude) - radians(%s)) +
                        sin(radians(%s)) * sin(radians(latitude))
                    )
                    """,
                (latitude, longitude, latitude)
            )
        ).filter(distance__lt=radius).order_by('distance')


class WeatherFilter(FilterSet):
    """
    Allows filtering of weather data by national park name.
    """
    national_park = filters.CharFilter(field_name='national_park__name')
    
    class Meta:
        model = app_models.Weather
        fields = '__all__'
