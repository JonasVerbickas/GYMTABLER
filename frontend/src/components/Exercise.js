
export default function Exercise(props) {

    return (
        <p className="exercise" onClick={props.onClick}>{props.name}</p>
    );
}
