from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils.datastructures import MultiValueDictKeyError
import json
from .workout_gen import workout_generator

# Create your views here.

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




    
