# Generated by Django 3.1.4 on 2021-03-10 22:07

from django.db import migrations, models
from json import loads
from main.models import Exercise
from workouts.models import Workout
from django.contrib.auth import get_user_model
User = get_user_model()


def importexercises(apps, se):

    with open("main/exercise.json", 'r') as f:
        Exercise.objects.all().delete()
        exercise_dict = loads(f.read())

    for exercise in exercise_dict:
        exercise_var = Exercise(name=exercise['name'], description=exercise['description'],
                                equipment=exercise['equipment'], difficulty=exercise['difficulty'],
                                bodypart=",".join(exercise['bodypart']), link=exercise['link'])
        exercise_var.save()


def importworkouts(apps, se):

    with open("workouts/workouts.json") as f:
        data = loads(f.read())

    if list(User.objects.filter(username="SUPER")) == []:
        User.objects.create(username="SUPER", password="abcd1234",
                            email="super@super.com",)

    diffs = {"Easy": 1, "Medium": 2, "Hard": 3}

    Workout.objects.all().delete()

    for dataworkout in data:
        workout = Workout()

        workout.bodyparts = ','.join(dataworkout["Bodypart"])
        exers = []
        for exdata in dataworkout["Exercises"]:
            try:
                ex = Exercise.objects.get(name__iexact=exdata)
            except Exception as e:
                print("\n\n" + exdata)

            exers.append(ex)

        workout.difficulty = diffs[dataworkout["Difficulty"]]

        workout.account = User.objects.get(username="SUPER")
        workout.save()

        workout.exercises.add(*exers)


class Migration(migrations.Migration):

    atomic = False

    dependencies = [
        ('workouts', '0008_auto_20210310_2206'),
    ]

    operations = [
        migrations.AddField(
            model_name='workout',
            name='name',
            field=models.TextField(default='prebuilt'),
            preserve_default=False,
        ),
        migrations.RunPython(importexercises),
        migrations.RunPython(importworkouts)
    ]
