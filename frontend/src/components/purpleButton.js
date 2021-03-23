import "../assets/css/purpleButton.css";

export default function PurpleButton(props) {
    return (<button disabled={props.cart.length === 0} className="continue-button">{props.text}</button>);
}