import PropTypes from 'prop-types';
import "../../assets/css/exerciseTileFilters.css";

function ExerciseTileFilters(props) {
    function searchFilterChange(event) {
        let new_filter = props.filter;
        new_filter.text = event.target.value.toLowerCase();
        props.onFilterChange(new_filter);
    }

    function equipmentCheckboxChange(event) {
        let name_of_changed = event.target.name;
        console.log(name_of_changed);
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
        <input id="searchbox" type="search" placeholder="Search.." onChange={(e) => searchFilterChange(e)}></input>
        <div id="equipment-filter">
            <p>Equipment:</p>
            <div id="equipment-checkboxes">
                {props.possible_equipment.map(piece_of_equipment => <div key={piece_of_equipment} className="equipment-checkbox">
                    <input id={"checkbox " + piece_of_equipment} type="checkbox" name={piece_of_equipment} onChange={(e) => equipmentCheckboxChange(e)}></input>
                    <label htmlFor={"checkbox " + piece_of_equipment}>{piece_of_equipment}</label>
                </div>)}
            </div>
        </div>
    </div>);
}


ExerciseTileFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    possible_equipment: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired
}

export default ExerciseTileFilters;