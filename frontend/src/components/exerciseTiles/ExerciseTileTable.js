import "../../assets/css/exerciseTable.css";
import ExerciseTile from "./ExerciseTile";
import PropTypes from 'prop-types';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import filteredExerciseMask from "./exerciseFiltering.js";


export default function ExerciseTileTable(props) {
    let filtered_exercise_mask = filteredExerciseMask(props.listOfExercises, props.filter);
    // map breakpoints where the number of columns displayed increases
    let breakpoints = { 400: 1, 800: 2, 1200: 3, 1600: 4, 2000: 5 };
    if (filtered_exercise_mask.includes(true))
    {
        return (<ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry className="exercise-tile-table">
                {props.listOfExercises.map((exercise, index) => {
                    return (<div style={{ display: filtered_exercise_mask[index] ? 'inherit' : 'none'}}><ExerciseTile key={exercise.name} exercise={exercise} addToCart={props.addToCart} /></div>);
                    })
                }
            </Masonry></ResponsiveMasonry>)
    }
    else
    {
        return <div className='exercise-tile-table'><p style={{textAlign:'center', margin: 0}}>No exercises found</p></div>;
    }
}

ExerciseTileTable.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
}