import "../../assets/css/exerciseCart.css";

export default function ExerciseCart(props) {
    return (<div id="exercise-cart">
        <h4>Exercise cart:</h4>
        {props.cart.length > 0 ? <ul>{props.cart.map((exercise_in_cart) => (<li key={exercise_in_cart} onClick={() => props.removeFromCart(exercise_in_cart)}>{exercise_in_cart}</li>))}</ul> : <h6>No exercises added</h6>}
    </div>);
}