from django.contrib import admin
from workouts.models import Workout


class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['account', 'slug']
    search_fields = ['account']
    readonly_fields = ['slug']

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Workout, WorkoutAdmin)
