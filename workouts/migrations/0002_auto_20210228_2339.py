# Generated by Django 3.1.6 on 2021-02-28 23:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='workout',
            old_name='account',
            new_name='user',
        ),
    ]
