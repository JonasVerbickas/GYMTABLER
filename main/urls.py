from django.urls import path

from .views import index, test

urlpatterns = [
    path('main/', index, name='index'),
]