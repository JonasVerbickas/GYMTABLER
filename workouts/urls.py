from django.urls import path


from .views import get_prebuilt_workouts

urlpatterns = [
    path('get_prebuilt', get_prebuilt_workouts)
]
