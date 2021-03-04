from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from account.models import Account
from workouts.models import Workout
from workouts.api.serializers import WorkoutSerializer

@api_view(['GET', ])
def api_detail_workout_view(request, slug):

    try:
        workout = Workout.objects.get(slug=slug)
    except Workout.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = WorkoutSerializer(workout)
    return Response(serializer.data)

@api_view(['PUT', ])
def api_update_workout_view(request, slug):

    try:
        workout = Workout.objects.get(slug=slug)
    except Workout.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = WorkoutSerializer(workout, data=request.data)
    data = {}
    if serializer.is_valid():
        serializer.save()
        data['success'] = "update successful"
        return Response(data=data)
    return Response(serializer.data)

@api_view(['DELETE', ])
def api_delete_workout_view(request, slug):

    try:
        workout = Workout.objects.get(slug=slug)
    except Workout.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    operation = workout.delete()
    data = {}
    if operation:
        data['success'] = "delete successful"
    else:
        data['failure'] = "delete failed"
    return Response(data=data)

@api_view(['POST', ])
def api_create_workout_view(request):

    account = Account.objects.get(pk=1)
    workout = Workout(account=account)

    serializer = WorkoutSerializer(workout, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)