from django.db import models

class Exercise(models.Model):
    name_ex = models.CharField(max_length = 100)
    score = models.TextField()

