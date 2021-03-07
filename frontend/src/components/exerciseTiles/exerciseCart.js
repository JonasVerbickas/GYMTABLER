import "../../assets/css/exerciseCart.css";
import CartItem from "./cartItem.js";

export default function ExerciseCart(props) {
    return (<div id="exercise-cart">
        <h4>Exercise cart:</h4>
        {props.cart.length > 0 ? <ul>{props.cart.map((exercise_in_cart) => (<CartItem key={exercise_in_cart} name={exercise_in_cart} removeFromCart={() => props.removeFromCart(exercise_in_cart)}/>))}</ul> : <h6>No exercises added</h6>}
        { props.cart.length > 0 ? <button className="continue-button">Continue</button> : <button disabled className="continue-button">Continue</button> }
    </div>);
}