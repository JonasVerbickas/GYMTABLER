from django.shortcuts import render
import json

with open('exercise.json', 'r') as f:
	exercise_dict = json.load(f)


