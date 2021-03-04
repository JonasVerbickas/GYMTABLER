import "../../assets/css/addButton.css"

export default function AddButton(props) {
    return (<button onClick={(e) => (e.stopPropagation())} className="add-btn">
        Add
        </button>)
}