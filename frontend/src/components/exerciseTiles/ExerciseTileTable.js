import "../../assets/css/exerciseTable.css";
import ExerciseTile from "./ExerciseTile";
import PropTypes from 'prop-types';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import filteredExercises from "./exerciseFiltering.js";


export default function ExerciseTileTable(props) {
    let filtered_exercises = filteredExercises(props.listOfExercises, props.filter);
    // map breakpoints where the number of columns displayed increases
    let breakpoints = { 400: 1, 800: 2, 1200: 3, 1600: 4, 2000: 5 } 
    console.log("breakpoints"+breakpoints[1]);
    if (filtered_exercises.length)
    {
        return (<ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry className="exercise-tile-table">
                {filtered_exercises.map((exercise) => (<ExerciseTile key={exercise.name} exercise={exercise} addToCart={props.addToCart} />))}
            </Masonry></ResponsiveMasonry>)
    }
    else
    {
        return <div></div>;
    }
}

ExerciseTileTable.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
}