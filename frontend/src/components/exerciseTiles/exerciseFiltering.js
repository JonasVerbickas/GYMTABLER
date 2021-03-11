function matchesSearchFilter(exercise, filter) {
    if (exercise.name.toLowerCase().includes(filter.text)) {
        return true;
    }
    else if (exercise.description.toLowerCase().includes(filter.text)) {
        return true;
    }
    else {
        return false;
    }
}

function matchesEquipmentFilter(exercise, filter) {
    if (filter.equipment.length > 0) {
        if (exercise.equipment) {
            for (let i = 0; i < exercise.equipment.length; i++) {
                if (filter.equipment.includes(exercise.equipment[i])) {
                    return true;
                }
            }
        }
        return false;
    }
    return true;
}

function checkIfMatchesFilter(exercise, filter) {
    if (matchesSearchFilter(exercise, filter) && matchesEquipmentFilter(exercise, filter)) {
        return true;
    }
    else {
        return false;
    }
}

export default function filteredExercises(listOfExercises, filter) {
    let filtered_exercises = [];
    listOfExercises.forEach(function (exercise) {
        if (checkIfMatchesFilter(exercise, filter)) {
            filtered_exercises.push(exercise);
        }
    });
    return filtered_exercises;
}