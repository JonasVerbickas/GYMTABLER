import ExerciseTileTable from '../components/ExerciseTileTable.js';
import PropTypes from 'prop-types';

export default function SortedExerciseTables(props) {
    let sorted_exercises = {}
    props.listOfExercises.forEach(function (exercise){
        if(exercise)
        {
            if(exercise.bodypart)
            {
                exercise.bodypart.forEach(function (bp) {
                    if (Object.keys(sorted_exercises).includes(bp)) {
                        sorted_exercises[bp].push(exercise);
                    }
                    else {
                        sorted_exercises[bp] = [exercise];
                    }
                })
            }
        }
    })

    return (<div>{Object.keys(sorted_exercises).map(function(bodypart){
        console.log(bodypart)
        return (<div>
            <h1>{bodypart}</h1>
            <ExerciseTileTable listOfExercises={sorted_exercises[bodypart]}/>
            </div>)
    })}
    </div>)
}


SortedExerciseTables.defaultProps = {
    listOfExercises: []
}

SortedExerciseTables.propTypes = {
    listOfExercises: PropTypes.array.isRequired
}