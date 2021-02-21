import ExerciseTile from './ExerciseTile.js';

export default function ExerciseTileColumn(props)
{
    return (<div className="exercise-tile-column">
        {props.listOfExercises.map((exercise, index) => <ExerciseTile key={"exercise_tile"+index} title={exercise.title} img={exercise.img}/>)}
    </div>)

}