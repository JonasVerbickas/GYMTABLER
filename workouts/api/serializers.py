from rest_framework import serializers
from workouts.models import Workout

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'exercises', 'difficulty', 'account', 'slug']