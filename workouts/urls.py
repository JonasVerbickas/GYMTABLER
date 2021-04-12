from django.urls import path


from .views import get_prebuilt_workouts, get_user_workouts, save_workout

urlpatterns = [
    path('get_prebuilt/', get_prebuilt_workouts),
    path('get_user/', get_user_workouts),
    path('save/', save_workout)
]
