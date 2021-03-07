import "../../assets/css/addButton.css"

export default function RemoveButton(props) {
    let style = "cart-btn btn-remove";
    let text = 'Remove';
    return (<button onClick={props.onClick} className={style}>{text}</button>);
}