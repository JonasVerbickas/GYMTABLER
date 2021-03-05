import PropTypes from 'prop-types';
import React from 'react';
import "../../assets/css/exerciseTileFilters.css";

class ExerciseTileFilters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            onFilterChange: props.onFilterChange,
            possible_equipment: props.possible_equipment,
            filter: props.filter
        }
    }

    searchFilterChange(e) {
        let new_filter = this.state.filter;
        new_filter.text = e.target.value.toLowerCase();
        this.state.onFilterChange(new_filter);
    }

    equipmentCheckboxChange(e) {
        let name_of_changed = e.target.name;
        console.log(name_of_changed);
        let new_filter = this.state.filter;
        if (new_filter.equipment.includes(name_of_changed)) {
            let i = new_filter.equipment.indexOf(name_of_changed);
            new_filter.equipment.splice(i, 1);
        }
        else {
            new_filter.equipment.push(name_of_changed);
        }
        this.state.onFilterChange(new_filter);
    }

    render(){
        return (<div id="filters">
            <input id="searchbox" type="search" placeholder="Search.." onChange={(e) => this.searchFilterChange(e)}></input>
            <div id="equipment-filter">
                <p>Equipment:</p>
                <div id="equipment-checkboxes">
                    {this.state.possible_equipment.map(piece_of_equipment => <div key={piece_of_equipment} className="equipment-checkbox">
                        <input id={"checkbox " + piece_of_equipment} type="checkbox" name={piece_of_equipment} onChange={(e) => this.equipmentCheckboxChange(e)}></input>
                        <label htmlFor={"checkbox " + piece_of_equipment}>{piece_of_equipment}</label>
                    </div>)}
                </div>
            </div>
        </div>);
    }
}


ExerciseTileFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    possible_equipment: PropTypes.array.isRequired,
    current_filter: PropTypes.array.isRequired
}

export default ExerciseTileFilters;