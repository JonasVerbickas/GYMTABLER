import "../../assets/css/exerciseTileFilters.css";
import PurpleButton from "../purpleButton";
import EquipmentFilter from "../exerciseTiles/equipmentFilter";

function ExerciseTileFilters(props) {
    function searchFilterChange(event) {
        let new_filter = props.filter;
        new_filter.text = event.target.value.toLowerCase();
        props.onFilterChange(new_filter);
    }

    function equipmentCheckboxChange(event) {
        let name_of_changed = event.target.name;
        let new_filter = props.filter;
        if (new_filter.equipment.includes(name_of_changed)) {
            let i = new_filter.equipment.indexOf(name_of_changed);
            new_filter.equipment.splice(i, 1);
        }
        else {
            new_filter.equipment.push(name_of_changed);
        }
        props.onFilterChange(new_filter);
    }

    return (<div id="filters">
        <input id="searchbox" type="search" placeholder="Search.." onChange={(e) => searchFilterChange(e)} value={props.filter.text}></input>
        <EquipmentFilter possible_equipment={props.possible_equipment} checkboxState={props.filter.equipment} equipmentCheckboxChange={equipmentCheckboxChange}/>
        <PurpleButton text="Clear filters" onClick={props.resetFilter}/>
    </div>);
}

export default ExerciseTileFilters;