# Generated by Django 3.1.6 on 2021-03-11 03:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0003_auto_20210218_2147'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bodyparts', models.TextField()),
                ('difficulty', models.IntegerField(default=2)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('exercises', models.ManyToManyField(to='main.Exercise')),
            ],
            options={
                'db_table': 'Workouts Table',
            },
        ),
    ]
