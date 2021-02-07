from .models import Exercise

def workout_generator(duration, intensity, frequency):

    '''I assume request.POST contains duration, intensity, frequency as inputs''' 

    # Algorithm will generate a full body workout 
    # 1) Users will be given a level and user is restricted to the exercises on the same level
    # 2) Every exercise will be given a default rep range
    # 3) Duration increase rounds, 15, 30, 45, 60, 75
    # 4) Intensity affects reps, (1 to 5) -> (0.5 to 2.0)
    # 5) Frequency determines workout frequency in a week

    workout_schedule = {}
    workout_rounds = int(duration/15)
    workout_ex = []
    intensity_mult = (intensity-1)*0.375 + 0.5
    ex_query = Exercise.objects.all()

    for exercise in ex_query:
        ex = {}
        ex['name'] = exercise.name_ex
        ex['reps'] = int(exercise.reps * intensity_mult)
        workout_ex.append(ex)

    workout_schedule['exercises'] = workout_ex
    workout_schedule['rounds'] = workout_rounds
    workout_schedule['frequency'] = frequency

    return workout_schedule





    