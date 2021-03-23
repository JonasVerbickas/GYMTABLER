import "../../assets/css/exerciseCart.css";
import CartItem from "./cartItem.js";
import PurpleButton from "../purpleButton";

export default function ExerciseCart(props) {
    return (<div id="exercise-cart">
        <h3 className="cart-header">Exercise cart</h3>
        {props.cart.length > 0 ? <div className="cart-list">{props.cart.map((exercise_in_cart) => (<CartItem key={exercise_in_cart} name={exercise_in_cart} removeFromCart={() => props.removeFromCart(exercise_in_cart)} />))}</div> : <h6 style={{margin: 30}}>No exercises added</h6>}
        <PurpleButton disabled={props.cart.length === 0} text={"Continue"}/>
    </div>);
}