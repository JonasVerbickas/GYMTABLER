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
        wdata["name"] = w.name
        wdata["slug"] = w.slug
        wdata["user"] = w.account.username
        wdata["difficulty"] = w.difficulty
        wdata["exercises"] = list(w.exercises.all().values())
        data.append(wdata)

    return json.dumps(data)


@api_view(['GET', ])
def get_prebuilt_workouts(request):
    user = get_user_model().objects.get(username="SUPER")
    workouts = Workout.objects.filter(account=user)
    wdata = {}
    print(user)
    return HttpResponse(serializejson(workouts))


@api_view(['GET', ])
def get_user_workouts(request):
    user = request.user
    workouts = Workout.objects.filter(account=user)
    print(user)

    return HttpResponse(serializejson(workouts))


@api_view(['POST'])
def save_workout(request):
    user = request.user
    print("user",user)
    parameters = request.POST

    exercises = json.loads(parameters["exercises"])
    print("exercises",exercises)
    workout = Workout()
    workout.difficulty = 2
    workout.bodypart = ""
    workout.account = user
    
    try:
        workout.name = json.loads(parameters["name"])
    except KeyError:
        workout.name = "default"
    workout.save()

    for x in exercises:
        print(x)
        ex = Exercise.objects.get(name=x)
        workout.exercises.add(ex)

    workout.save()
    return HttpResponse(status=200)
