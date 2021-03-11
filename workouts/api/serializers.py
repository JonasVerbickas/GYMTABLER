from rest_framework import serializers
from workouts.models import Workout

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'workout_title', 'workout_content', 'date_created', 'account', 'slug']