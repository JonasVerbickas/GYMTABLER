import PropTypes from 'prop-types';
import "../../assets/css/exerciseTileFilters.css";

function ExerciseTileFilters(props) {
    return(
    <div id="filters">
        <input id="searchbox" type="search" placeholder="Search.." onChange={(e) => props.searchChange(e)}></input>
        <div id="equipment-filter">
            <p>Equipment:</p>
            <div id="equipment-checkboxes">
                {props.possible_equipment.map(piece_of_equipment => <div key={piece_of_equipment} className="equipment-checkbox">
                    <input id={"checkbox "+piece_of_equipment} type="checkbox" name={piece_of_equipment} onChange={(e) => props.equipmentChange(e)}></input> 
                    <label htmlFor={"checkbox "+piece_of_equipment}>{piece_of_equipment}</label>
                    </div>)}
            </div>
        </div>
    </div>);
}


ExerciseTileFilters.propTypes = {
    searchChange: PropTypes.func.isRequired,
    equipmentChange: PropTypes.func.isRequired
}

export default ExerciseTileFilters;