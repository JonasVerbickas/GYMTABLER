import "../../assets/css/exerciseCart.css";
import CartItem from "./cartItem.js";
import PurpleButton from "../purpleButton";

function postReq(exercise_cart) {
  console.log("EXERCISE CART", exercise_cart);
  fetch("http://127.0.0.1:8000/workout/save/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
    body: JSON.stringify({
      exercises: exercise_cart,
      bodyparts: "custom_workout",
    }),
  });
}

export default function ExerciseCart(props) {
  console.log(props.cart);
  return (
    <div id="exercise-cart">
      <h3 className="cart-header">Exercise cart</h3>
      {props.cart.length > 0 ? (
        <div className="cart-list">
          {props.cart.map((exercise_in_cart) => (
            <CartItem
              key={exercise_in_cart}
              name={exercise_in_cart}
              removeFromCart={() => props.removeFromCart(exercise_in_cart)}
            />
          ))}
        </div>
      ) : (
        <h6 style={{ margin: 30 }}>No exercises added</h6>
      )}
      <PurpleButton
        disabled={props.cart.length === 0}
        text={"Continue"}
        onClick={() => postReq(props.cart)}
      />
    </div>
  );
}
