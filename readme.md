# Raining Chestnuts

Welcome to Raining Chestnuts, the premier technical assessment weather application that provides current and historical weather data for national parks!

## Application Overview
The application is built using the following technologies:
- **Frontend**: Angular
- **Backend**: Django/Django REST Framework
- **Database**: PostgreSQL
- **Caching**: Redis
- **Task Queueing and Scheduling**: Celery
- **Containerization**: Docker/Docker Compose

While there are a lot of components for such a small application, I believed it to be important to showcase my expertise among
these technologies and my ability to stand up a full stack containerized application in a short amount of time.


## Initialization
To get started, all that is needed to run this application is docker and docker-compose.

To initialize the application, be sure no other applications are running on ports 80, 8000, 4200, 5432, and 6379,
then navigate to the root director of the project and simply run `docker-compose up`.
Once the project finishes building, the application will be available on your browser at `http://localhost`.

I do advise waiting about 30 seconds to a minute for celery to finish syncing the initial weather data (indicated by the logline from the celery container: `celery-1 | Weather data updated successfully!`).
