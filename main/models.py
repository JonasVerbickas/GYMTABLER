from django.db import models

class Exercise(models.Model):
	name = models.CharField(max_length = 100)
	description= models.TextField()
	equipment = models.TextField(null=True)
	difficulty = models.IntegerField()
	bodypart = models.TextField(null=True)
	link = models.TextField()

	def __str__(self):
		return f"{self.name};{self.description};{self.equipment};{self.difficulty};{self.bodypart};{self.link}"


