import "../../assets/css/addButton.css"

export default function AddButton(props) {
    let style = "cart-btn btn-add";
    let text = 'Add';
    return (<button onClick={props.onClick} className={style}>{text}</button>);
}