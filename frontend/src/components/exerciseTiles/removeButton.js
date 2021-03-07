import "../../assets/css/cartButton.css"

export default function RemoveButton(props) {
    return (<button onClick={props.onClick} className={"cart-btn btn-remove"}>Remove</button>);
}