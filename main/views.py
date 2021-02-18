from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils.datastructures import MultiValueDictKeyError
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

@csrf_exempt
@require_http_methods(["POST"])
def get_workout(request):
    parameters = request.POST
    try:
        duration = int(parameters["duration"])
        intensity = int(parameters["intensity"])
        frequency = int(parameters["frequency"])
    except MultiValueDictKeyError:
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
	        exercise_dict = json.load(f)

        for exercise in exercise_dict:
            exercise_var = Exercise(name=exercise['name'],description=exercise['description'],equipment=exercise['equipment'],difficulty=exercise['difficulty'],bodypart=exercise['bodypart'],link=exercise['link'])
            exercise_var.save()
    except ValueError:
        res = HttpResponse("<h2>ERROR</h2>")
        res.status_code = 400
        return res

    return HttpResponse("Done!")

@csrf_exempt
@require_http_methods(["GET"])
def getexercises(request):
    try:
        print(Exercise.objects.values())
        exercises = list(Exercise.objects.values())
        response = json.dumps(exercises)
    except ValueError:
        response = json.dumps([{'Error': 'No exercises found.'}])

    return HttpResponse(response, content_type='text/json')

    
