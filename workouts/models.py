from django.db import models

from django.utils.text import slugify
from django.conf import settings
from django.db.models.signals import pre_save
from main.models import Exercise

class Workout(models.Model):
    workout_title = models.CharField(max_length=50, verbose_name="Workout Title", null=False)
    workout_exercises = models.ManyToManyField(Exercise)
    workout_description = models.TextField(max_length=250, verbose_name="Description")
    date_created = models.DateTimeField(verbose_name="Date Created", auto_now_add=True)
    account = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    slug = models.SlugField(blank=True, unique=True)

    class Meta:
        db_table = "Workouts Table"
        
    def __str__(self):
        return self.slug

def pre_save_workout_receiever(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = slugify(instance.account.username + "-" + instance.workout_title)

pre_save.connect(pre_save_workout_receiever, sender=Workout)