from django.shortcuts import render
from workouts.models import Workout
from main.models import Exercise
from django.contrib.auth import get_user_model
from django.http import HttpResponse
import json
from rest_framework.decorators import api_view


def serializejson(workouts):
    data = []
    for w in workouts:
        wdata = {}
        wdata["slug"] = w.slug
        wdata["user"] = w.account.username
        wdata["difficulty"] = w.difficulty
        wdata["exercises"] = list(w.exercises.all().values())
        data.append(wdata)

    return json.dumps(data)


@api_view(['GET',])
def get_prebuilt_workouts(request):
    user = get_user_model().objects.get(username="SUPER")
    workouts = Workout.objects.filter(account=user)
    wdata = {}
    print(user)
    return HttpResponse(serializejson(workouts))


@api_view(['GET',])
def get_user_workouts(request):
    user = request.user
    workouts = Workout.objects.filter(account=user)
    print(user)

    return HttpResponse(serializejson(workouts))


@api_view(['POST'])
def save_workout(request):
    user = request.user()
    parameters = request.POST
    difficulty = int(parameters["difficulty"])
    body_part = parameters["bodyparts"]
    Exercises = parameters["exercises"].split(", ")
    workout = Workout()

    for x in Exercises:
        ex = Exercises.objects.get(name=x)
        workout.exercises.add(ex)
    try:
        workout.name = parameters["name"]
    except KeyError:
        workout.name = "Default"

    workout.difficulty = difficulty
    workout.bodypart = body_part
    workout.account = user
    workout.save()
