import "../assets/css/purpleButton.css";

export default function PurpleButton(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className="continue-button"
    >
      {props.text}
    </button>
  );
}
