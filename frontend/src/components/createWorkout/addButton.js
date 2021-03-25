import "../../assets/css/cartButton.css";

export default function AddButton(props) {
  return (
    <button onClick={props.onClick} className={"cart-btn btn-add"}>
      Add
    </button>
  );
}
