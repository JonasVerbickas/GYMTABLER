import ExerciseTileColumn from '../components/ExerciseTileColumn.js';
import PropTypes from 'prop-types';


function checkIfMatchesFilter(exercise, filter) {
    if (exercise.name.toLowerCase().includes(filter.text)) {
        return true;
    }
    else if (exercise.description.toLowerCase().includes(filter.text))
    {
        return true;
    }
    else {
        return false;
    }
}

// FIXED SIZE ROWS
const NUM_OF_COLUMNS = 3;
export default function ExerciseTileTable(props) {
    let exercise_columns = [];
    for (let i = 0; i < NUM_OF_COLUMNS; i++) {
        exercise_columns.push([]);
    }
    let index = 0;
    props.listOfExercises.forEach(function (exercise, OG_index) {
        if(checkIfMatchesFilter(exercise, props.filter))
        {
            exercise_columns[index].push([OG_index, exercise]);
            index++;
            if (index === NUM_OF_COLUMNS) {
                index = 0;
            }
        }
    })

    console.log(exercise_columns);
    console.log(props.filter);
    return (<div className="exercise-tile-table">
        {exercise_columns.map((column_list, index) => (<ExerciseTileColumn key={index} listOfExercises={column_list}/>))}
    </div>)
}

ExerciseTileTable.defaultProps = {
    listOfExercises: [],
    filter: {text: ""}
}

ExerciseTileTable.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object
}