from django.urls import path

from .views import index, get_workout,populate_db,getexercises

urlpatterns = [
    path('main/', index, name='index'),
    path('get_workout', get_workout),
    path('populate_db', populate_db),
    path('getexercises',getexercises)
]