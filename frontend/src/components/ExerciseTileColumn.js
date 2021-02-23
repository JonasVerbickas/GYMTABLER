import ExerciseTile from './ExerciseTile.js';
import PropTypes from 'prop-types';

export default function ExerciseTileColumn(props)
{
    return (<div className="exercise-tile-column">
        {props.listOfExercises.map(function(index_and_exercise){
            return (<ExerciseTile key={index_and_exercise[0]} exercise={index_and_exercise[1]} />);
            })}
            
    </div>)
}

ExerciseTileColumn.propTypes = {
    listOfExercises: PropTypes.array.isRequired,
}