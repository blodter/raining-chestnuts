import json

from django.core.management.base import BaseCommand

from app.models import NationalPark


class Command(BaseCommand):
    help = 'Loads initial National Park data from a JSON file'
    
    def handle(self, *_, **__):
        """
        Load initial data from the JSON file and create/update National Park records.
        """
        self.stdout.write(self.style.WARNING('Loading data from data.json...'))
        with open('data.json', 'r') as file:
            data = json.load(file)
            for region_name in data:
                for national_park in data[region_name]:
                    try:
                        longitude, latitude = national_park['geometry']['coordinates']
                        defaults = dict(
                            latitude=latitude,
                            longitude=longitude,
                            name=national_park['name'],
                            region=region_name
                        )
                        national_park, created = NationalPark.objects.update_or_create(
                            id=national_park['id'],
                            defaults=defaults
                        )
                        if created:
                            self.stdout.write(self.style.SUCCESS(f'Created National Park: {national_park.name}'))
                        else:
                            self.stdout.write(self.style.SUCCESS(f'Updated National Park: {national_park.name}'))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'Error creating National Park: {e}'))
