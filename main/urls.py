from django.urls import path

from .views import index, get_workout

urlpatterns = [
    path('main/', index, name='index'),
    path('get_workout', get_workout),
]