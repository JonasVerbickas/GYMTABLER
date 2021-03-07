import AddButton from './addButton'
import RemoveButton from './removeButton'

export default function SmallExerciseTile(props) {
    return (
        <div className="exercise-tile-border">
            <div className="exercise-tile small-exercise-tile" onClick={() => props.expandOnClick()}>
                <img src={props.exercise.img} alt={props.exercise.name + " image"}/>
                <h4 className="exercise-title">{props.exercise.name}</h4>
                {
                    !props.added_to_cart ? (
                    <AddButton onClick={(e) => props.wrappedAddToCart(e, props.exercise)}/>) : (
                    <RemoveButton onClick={(e) => props.wrappedAddToCart(e, props.exercise)} />)
                }
                
            </div>
        </div>
    );
}