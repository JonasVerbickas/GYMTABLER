from django.contrib import admin
from workouts.models import Workout

class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['account', 'workout_title', 'workout_content', 'date_created', 'slug']
    search_fields = ['account']
    readonly_fields= ('slug', 'date_created')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Workout, WorkoutAdmin)