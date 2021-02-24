import ExerciseTile from './ExerciseTile.js';
import PropTypes from 'prop-types';

export default function ExerciseTileColumn(props)
{
    return (<div className="exercise-tile-column">
        {props.listOfExercises.map(function(exercise){
            return (<ExerciseTile key={exercise.name} exercise={exercise} />);
            })}
            
    </div>)
}

ExerciseTileColumn.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
}