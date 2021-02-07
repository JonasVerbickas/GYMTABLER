from django.db import models

class Exercise(models.Model):
    name_ex = models.CharField(max_length = 100)
    score = models.IntegerField()
    body_part = models.TextField()
    reps = models.IntegerField()

    class Meta:
        db_table = "Exercises"

    def __str__(self):
        return self.name_ex
    
