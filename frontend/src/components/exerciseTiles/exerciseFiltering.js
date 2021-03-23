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
        if (exercise.equipment.length > 0) {
            for (let i = 0; i < exercise.equipment.length; i++) {
                if (filter.equipment.includes(exercise.equipment[i])) {
                    return true;
                }
            }
            // exercise requires equipment and does not match filter
            return false;
        }
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

export default function filteredExerciseMask(listOfExercises, filter) {
    let exercise_mask = [];
    listOfExercises.forEach(function (exercise) {
        if (checkIfMatchesFilter(exercise, filter)) {
            exercise_mask.push(true);
        }
        else{
            exercise_mask.push(false);
        }
    });
    return exercise_mask;
}