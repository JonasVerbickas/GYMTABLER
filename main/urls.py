from django.urls import path


from .views import index, get_workout, register_user, user_login, getexercises, populate_db

urlpatterns = [
    path('main/', index, name='index'),
    path('get_workout', get_workout),
    path('login', user_login),
    path("register", register_user),
    path('get_exercises', getexercises),
    path('populate_db', populate_db)
]
