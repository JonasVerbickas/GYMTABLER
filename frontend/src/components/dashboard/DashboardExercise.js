
export default function Exercise(props) {

    return (
        <p className="exercise" onClick={props.onClick}> &bull; {props.exercise.name}</p>
    );
}
