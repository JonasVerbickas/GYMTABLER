import "../../assets/css/exerciseTable.css";
import ExerciseTile from "./ExerciseTile";
import PropTypes from 'prop-types';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import filteredExercises from "./exerciseFiltering.js";

const MAX_NUM_OF_COLUMNS = 5;
const MAX_SIZE_OF_EACH_COL = 450; // px

export default function ExerciseTileTable(props) {
    let filtered_exercises = filteredExercises(props.listOfExercises, props.filter);
    // map breakpoints where the number of columns displayed increases
    let breakpoints = Object.fromEntries([...Array(MAX_NUM_OF_COLUMNS).keys()].map(item => [item * MAX_SIZE_OF_EACH_COL, item]))
    return (<ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
        <Masonry className="exercise-tile-table">
            {filtered_exercises.map((exercise) => (<ExerciseTile key={exercise.name} exercise={exercise} addToCart={props.addToCart} />))}
        </Masonry></ResponsiveMasonry>)
}

ExerciseTileTable.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
}