import ExerciseTileColumn from '../components/ExerciseTileColumn.js';
import PropTypes from 'prop-types';

// FIXED SIZE ROWS
const NUM_OF_COLUMNS = 3;
export default function ExerciseTileTable(props) {
    let exercise_columns = [];
    for (let i = 0; i < NUM_OF_COLUMNS; i++) {
        exercise_columns.push([]);
    }
    let index = 0;

    props.listOfExercises.forEach(function (element) {
        exercise_columns[index].push(element);
        index++;
        if (index === NUM_OF_COLUMNS) {
            index = 0;
        }
    })
    return (<div className="exercise-tile-table">
        {exercise_columns.map((column_list, index) => (<ExerciseTileColumn key={"exercise_tile_column:" + index} listOfExercises={column_list} />))}
    </div>)
}

ExerciseTileTable.defaultProps = {
    listOfExercises: []
}

ExerciseTileTable.propTypes = {
    listOfExercises: PropTypes.array.isRequired
}

// FIXED SIZE COLUMS
const NUM_OF_ROWS = 2;
function ExerciseTileTableBasedOnColumnSize(props) {
    let index = 0;
    let exercise_columns = [];
    while (index < props.listOfExercises.length) {
        exercise_columns.push(props.listOfExercises.slice(index, index + NUM_OF_ROWS));
        index += NUM_OF_ROWS;
    };

    return (<div className="exercise-tile-table">
        {exercise_columns.map((column_list) => (<ExerciseTileColumn listOfExercises={column_list} />))}
    </div>)

}