import "../../assets/css/exerciseCart.css";

export default function ExerciseCart(props) {
    return (<div id="exercise-cart">
        <h4>Exercise cart:</h4>
        {props.cart.length > 0 ? <ul>{props.cart.map((exercise_in_cart) => (<li key={exercise_in_cart.name}>{exercise_in_cart.name}</li>))}</ul> : <h6>No exercises added</h6>}
    </div>);
}