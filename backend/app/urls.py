from django.urls import include, re_path

from app import views

app_urls = [
    # National Park urls
    re_path(r'^national-parks/$', views.NationalParkList.as_view()),
    re_path(r'^national-parks/(?P<pk>[0-9]+)/$', views.NationalParkDetails.as_view()),
    
    # Weather urls
    re_path(r'^weather/$', views.WeatherList.as_view()),
    re_path(r'^weather/(?P<pk>[0-9]+)/$', views.WeatherDetails.as_view()),
]

urlpatterns = [
    re_path(r'^api/', include(app_urls)),
]
