import RemoveButton from "./removeButton.js";

export default function CartItem(props) {
    return (<div className="cart-item">
            <p className="item-name">{props.name}</p>
            <RemoveButton onClick={() => props.removeFromCart()}/>
        </div>);
}