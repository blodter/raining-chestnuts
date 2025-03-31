from django.db import models


class BaseModel(models.Model):
    """
    Abstract base model that includes common fields for all models.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class NationalPark(BaseModel):
    """
    Model representing a national park.
    """
    id = models.IntegerField(primary_key=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    name = models.CharField(max_length=255)
    region = models.CharField(max_length=15)
    
    class Meta:
        ordering = ['name']


class Weather(BaseModel):
    """
    Model representing weather data for a national park.
    """
    national_park = models.OneToOneField(
        NationalPark,
        related_name='weather',
        on_delete=models.CASCADE
    )
    current_temperature = models.FloatField()
    mean_daily_temperature = models.FloatField()
    historical_mean_temp_10 = models.FloatField()
    historical_mean_temp_20 = models.FloatField()
    historical_mean_temp_30 = models.FloatField()
    change_today_to_10 = models.FloatField(null=True)
    change_10_to_20 = models.FloatField(null=True)
    change_20_to_30 = models.FloatField(null=True)
