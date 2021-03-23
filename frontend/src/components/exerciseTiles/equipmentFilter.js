export default function EquipmentFilter(props)
{
    return (<div id="equipment-filter">
        <p>Equipment:</p>
        <div id="equipment-checkboxes">
            {props.possible_equipment.map((piece_of_equipment) => <div key={piece_of_equipment} className="equipment-checkbox">
                <input id={"checkbox " + piece_of_equipment} type="checkbox" name={piece_of_equipment} onChange={(e) => props.equipmentCheckboxChange(e)}checked={props.checkboxState.includes(piece_of_equipment)}></input>
                <label htmlFor={"checkbox " + piece_of_equipment}>{piece_of_equipment}</label>
            </div>)}
        </div>
    </div>);
}