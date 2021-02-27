export default function SmallExerciseTile(props) {
    return (
        <div className="exercise-tile-border">
            <div className="exercise-tile small-exercise-tile" onClick={() => props.handleClick()}>
                <img src={props.exercise.img} alt={props.exercise.name + " image"}/>
                <h4 className="exercise-title">{props.exercise.name}</h4>
            </div>
        </div>
    );
}