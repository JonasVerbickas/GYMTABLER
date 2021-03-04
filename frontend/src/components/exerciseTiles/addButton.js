import "../../assets/css/addButton.css"

export default function AddButton(props) {
    let style = !props.activated ? "cart-btn btn-add" : "cart-btn btn-remove";
    let text = !props.activated ? 'Add' : 'Remove';
    return (<button onClick={props.onClick} className={style}>{text}</button>);
}