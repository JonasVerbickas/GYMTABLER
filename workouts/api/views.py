from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
#permission_classes
#from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from workouts.models import Workout
from workouts.api.serializers import WorkoutSerializer

@api_view(['GET', ])
#@permission_classes([IsAuthenticated])
def api_detail_workout_view(request, slug):

    try:
        workout = Workout.objects.get(slug=slug)
    except Workout.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = WorkoutSerializer(workout)
    return Response(serializer.data)

@api_view(['PUT', ])
#@permission_classes([IsAuthenticated])
def api_update_workout_view(request, slug):

    try:
        workout = Workout.objects.get(slug=slug)
    except Workout.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    user = request.user
    if workout.author != user:
        return Response({'response':"You don't have permission to edit that."})

    serializer = WorkoutSerializer(workout, data=request.data)
    data = {}
    if serializer.is_valid():
        serializer.save()
        data['response'] = "UPDATE_SUCCESS"
        data['pk'] = workout.pk
        data['bodyparts'] = workout.bodyparts
        data['exercises'] = workout.exercises
        data['slug'] = workout.slug
        data['username'] = workout.account.username
        return Response(data=data)
    return Response(serializer.data)

@api_view(['DELETE', ])
#@permission_classes([IsAuthenticated])
def api_delete_workout_view(request, slug):

    try:
        workout = Workout.objects.get(slug=slug)
    except Workout.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    user = request.user
    if workout.account != user:
        return Response({'response':"You don't have permission to delete that."}) 

    operation = workout.delete()
    data = {}
    if operation:
        data['response'] = "DELETE_SUCCESS"
    return Response(data=data)

@api_view(['POST', ])
#@permission_classes([IsAuthenticated])
def api_create_workout_view(request):

    account = User.objects.get(pk=1)
    workout = Workout(account=account)

    serializer = WorkoutSerializer(workout, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
