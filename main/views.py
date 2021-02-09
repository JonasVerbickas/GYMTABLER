from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .workout_gen import workout_generator

# Create your views here.

def index(request):
    template = loader.get_template('main/index.html')
    return HttpResponse(template.render({}, request))