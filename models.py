from django.db import models

class Exercise(models.Models):
	name = models.Charfield(max_length = 100)
	description= models.TextField()
	equipment = models.TextField()
	difficulty = models.IntegerField()
	bodypart = models.TextField()
	link = models.TextField()


