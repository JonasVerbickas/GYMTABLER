from django.db import models

from django.utils.text import slugify
from django.conf import settings
from django.db.models.signals import pre_save
from main.models import Exercise


class Workout(models.Model):

    bodyparts = models.TextField()
    exercises = models.ManyToManyField(Exercise)
    difficulty = models.IntegerField(
        default=2)  # 1 = easy, 2 = medium, 3 = hard

    account = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = "workouts")
    slug = models.SlugField(blank=True, unique=True)

    class Meta:
        db_table = "Workouts Table"

    def __str__(self):
        return f"{self.bodyparts}, difficulty {self.difficulty}"


def pre_save_workout_receiever(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(
            instance.account.username + "-" + instance.bodyparts + "-" + str(instance.difficulty))


pre_save.connect(pre_save_workout_receiever, sender=Workout)
