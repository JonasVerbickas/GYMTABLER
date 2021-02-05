from django.shortcuts import render
from database.models import Exercise

def exercises(request):
    exercise_instance_chest_one = Exercise.objects.create(name_ex = "Incline Push Ups",score = "1")
    exercise_instance_chest_two = Exercise.objects.create(name_ex = "Push Up", score = "2")
    exercise_instance_arms_one = Exercise.objects.create(name_ex = "Tricep Dip", score = "1")
    exercise_instance_arms_two = Exercise.objects.create(name_ex = "Plank", score = "2")
    exercise_instance_legs_one = Exercise.objects.create(name_ex = "Squats", score = "1")
    exercise_instance_legs_two = Exercise.objects.create(name_ex = "Lunges", score = "2")
    exericse_instance_back_one = Exercise.objects.create(name_ex = "Superman", score = "1")
    exericse_instance_back_two = Exercise.objects.create(name_ex = "Wide Grip Push Up", score = "2")
    exericse_instance_shoulders_one = Exercise.objects.create(name_ex = "Incline Pushups", score = "1")
    exercise_instance_shoulders_two = Exercise.objects.create(name_ex = "Planks up down", score = "2")
    return render(request, 'GymTabler.html.html')
