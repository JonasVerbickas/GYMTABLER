import ExerciseTileColumn from '../components/ExerciseTileColumn.js';
import ExerciseTile from "../components/ExerciseTile"
import "../exerciseTable.css"
import PropTypes from 'prop-types';


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
    if(filter.equipment.length > 0)
    {
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
    if(matchesSearchFilter(exercise, filter) && matchesEquipmentFilter(exercise, filter))
    {
        return true;
    }
    else
    {
        return false;
    }
}

export default function ExerciseTileTable(props) {
    let filtered_exercises = []
    props.listOfExercises.forEach(function (exercise) {
        if(checkIfMatchesFilter(exercise, props.filter))
        {
            filtered_exercises.push(exercise);
        }
    })

    console.log(props.filter);
    return (<div className="exercise-tile-table">
        {filtered_exercises.map((exercise) => (<ExerciseTile key={exercise.name} exercise={exercise}/>))}
    </div>)
}

ExerciseTileTable.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object
}