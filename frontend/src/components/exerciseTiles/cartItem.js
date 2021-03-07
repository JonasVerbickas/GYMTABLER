import RemoveButton from "./removeButton.js";

export default function CartItem(props) {
    return (<div><p style={{ display: "inline" }}>{props.name}</p><RemoveButton onClick={() => props.removeFromCart()}/></div>);
}