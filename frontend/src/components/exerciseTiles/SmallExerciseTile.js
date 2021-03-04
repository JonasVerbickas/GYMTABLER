import AddButton from './addButton'

export default function SmallExerciseTile(props) {
    return (
        <div className="exercise-tile-border">
            <div className="exercise-tile small-exercise-tile" onClick={() => props.expandOnClick()}>
                <img src={props.exercise.img} alt={props.exercise.name + " image"}/>
                <h4 className="exercise-title">{props.exercise.name}</h4>
                <AddButton onClick={(e) => props.wrappedAddToCart(e, props.exercise)} activated={props.added_to_cart}/>
            </div>
        </div>
    );
}