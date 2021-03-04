from django.urls import path
from workouts.api.views import (
    api_detail_workout_view,
    api_update_workout_view,
    api_delete_workout_view,
    api_create_workout_view,
    )

app_name = 'workouts'

urlpatterns = [
    path('<slug>/', api_detail_workout_view, name='detail'),
    path('<slug>/update', api_update_workout_view, name='update'),
    path('<slug>/delete', api_delete_workout_view, name='delete'),
    path('create', api_create_workout_view, name='create'),
]
