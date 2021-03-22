from django.shortcuts import render
from django.models import Workout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.models import Exercises



def get_prebuilt_workouts(request):
    user = User.objects.get(username = "SUPER")
    workouts = User.workouts.all()
    
    ## json serialisation ##

    #return HttpResponse( ) 
    

@login_required
def get_user_workouts(request):
    user = request.user()
    workouts = User.workouts.all()

    ##json - 
    #return HttpResponse( )
   
@login_required
def save_workouts(request):
    user = request.user()
    parameters = request.POST
    difficulty = int(parameters["difficulty"])
    body_part = parameters["body parts"]
    Exercises = parameters["exercises"].split(", ")
    workout = Workout()
    for x in Exercises:
        ex = Exercises.objects.get(name = x)
        workout.exercises.add(ex)
    workout.name = parameters["name"]
    workout.difficulty = difficulty
    workout.bodypart = body_part
    workout.account = user
    workout.save()
    

    
