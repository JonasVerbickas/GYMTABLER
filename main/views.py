from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .user_methods import *
import json
import os
from .workout_gen import workout_generator
from .models import Exercise
# Create your views here.

current_path = os.path.dirname(__file__)
exe_pth = os.path.join(current_path, 'exercise.json')
print(exe_pth)

def index(request):
    template = loader.get_template('main/index.html')
    return HttpResponse(template.render({}, request))

# LOGIN SYSTEM
@csrf_exempt
def register_user(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']

    result, msg = validateusername(username, email)
    if not result:
        return HttpResponse(msg, status=409)

    user = User.objects.create_user(username, email, password)
    return HttpResponse(f"User {username} created successfully.")

@csrf_exempt
def user_login(request):
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponse("Success")
    else:
        return HttpResponse("Authentication Failed", status=403)




@csrf_exempt
@require_http_methods(["POST"])

def get_workout(request):
    parameters = request.POST

    try:
        print(parameters)
        duration = int(parameters["duration"])
        intensity = int(parameters["intensity"])
        frequency = int(parameters["frequency"])
    except MultiValueDictKeyError as e:
        print(e)
        res = HttpResponse("<h2>Bad Request: required parameter not found</h2>")
        res.status_code = 400
        return res
    except ValueError:
        res = HttpResponse("<h2>Incorrectly specified parameter</h2>")
        res.status_code = 400
        return res

    workout_data = workout_generator(duration, intensity, frequency)

    try:
        workout_data_response = json.dumps(workout_data)
        if workout_data_response is None:
            raise TypeError
    except TypeError:
        res = HttpResponse("<h2>Server Error in Workout Generation</h2>")
        res.status_code = 500
        return res

    return HttpResponse(workout_data_response)


@csrf_exempt
@require_http_methods(["POST"])
def populate_db(request):
    try:
        with open(exe_pth, 'r') as f:
            Exercise.objects.all().delete()
            exercise_dict = json.load(f)

        for exercise in exercise_dict:
            exercise_var = Exercise(name=exercise['name'],description=exercise['description'],
                equipment=exercise['equipment'],difficulty=exercise['difficulty'],
                bodypart=exercise['bodypart'],link=exercise['link'])
            exercise_var.save()

    except ValueError:
        res = HttpResponse("<h2>ERROR</h2>")
        res.status_code = 400
        return res

    return HttpResponse("Done!")

@csrf_exempt
@require_http_methods(["GET"])
def get_exercises(request):
    data = {"arms": [], "legs": [], "core": [], "chest": [],
            "shoulders": [], "back": [], "abs": [], "none": []}
    try:
        #print(Exercise.objects.values())
        exercises = list(Exercise.objects.values())

        for e in exercises:
            if e["bodypart"] is not None:
                bodyparts = eval(e["bodypart"])
                for bp in bodyparts:
                    data[bp].append(e)
            else:
                data["none"].append(e)

        response = json.dumps(data)
    except ValueError:
        response = json.dumps([{'Error': 'No exercises found.'}])

    return HttpResponse(response, content_type='text/json')

    
@csrf_exempt
@require_http_methods(["GET"])

def get_body_parts(request):
    data = ["shoulders", "arms", "chest", "core", "back", "legs", "abs"]
    return HttpResponse(json.dumps(data), content_type="application/json")