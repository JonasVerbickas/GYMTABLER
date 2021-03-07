import "../../assets/css/exerciseTable.css";
import ExerciseTile from "./ExerciseTile";
import PropTypes from 'prop-types';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import filteredExerciseMask from "./exerciseFiltering.js";


export default function ExerciseTileMansonry(props) {
    let filtered_exercise_mask = filteredExerciseMask(props.listOfExercises, props.filter);
    // map breakpoints where the number of columns displayed increases
    let breakpoints = { 400: 1, 850: 2, 1300: 3, 1750: 4, 2200: 5 };
    if (filtered_exercise_mask.includes(true))
    {
        return (<ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
            <Masonry className="exercise-tile-table">
                {props.listOfExercises.map((exercise, index) => {
                        if (filtered_exercise_mask[index])
                        {
                            return (
                                <ExerciseTile key={exercise.id} exercise={exercise} addToCart={props.addToCart} getExerciseCartStatus={() => props.getExerciseCartStatus(exercise.name)}/>
                            );
                        }
                    })
                }
            </Masonry></ResponsiveMasonry>)
    }
    else
    {
        return <div className='exercise-tile-table'><p style={{textAlign:'center', margin: 0}}>No exercises found</p></div>;
    }
}

ExerciseTileMansonry.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
}