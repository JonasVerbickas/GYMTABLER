# Generated by Django 3.1.6 on 2021-02-06 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_exercise_body_part'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='score',
            field=models.IntegerField(),
        ),
    ]
