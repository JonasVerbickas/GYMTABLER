import ExerciseTileTable from './ExerciseTileTable.js';
import "../sortedExerciseTables.css"
import PropTypes from 'prop-types';
import React from 'react';

class SortedExerciseTables extends React.Component {
    constructor(props){
        super(props);
        let sorted_exercises = {};  // stores all possible exercises sorted by bodypart
        let expanded_categories = {};
        let possible_equipment = [];  // list of every possible piece of equipment used
        props.listOfExercises.forEach(function (exercise) {
            if (exercise) {
                if (exercise.bodypart) {
                    exercise.bodypart.forEach(function (bp) {
                        if (Object.keys(sorted_exercises).includes(bp)) {
                            sorted_exercises[bp].push(exercise);
                        }
                        else {
                            sorted_exercises[bp] = [exercise];
                            expanded_categories[bp] = false;
                        }
                    })
                }
                if (exercise.equipment)
                {
                    exercise.equipment.forEach(function (e){
                        if (!possible_equipment.includes(e)) {
                            possible_equipment.push(e);
                        }
                    })
                }
            }
        });
        this.state = {
            listOfExercises: props.listOfExercises,
            sorted_exercises: sorted_exercises,
            expanded_categories: expanded_categories,
            possible_equipment: possible_equipment,
            filter: {text: "", equipment: []}
        };
    }

    bodypartList2Table(bodypart){
        if(this.state.expanded_categories[bodypart])
        {
            return (<div>
                <h1 className="body-part-header" onClick={() => this.expandOnClick(bodypart)}>{bodypart}</h1>
                <ExerciseTileTable listOfExercises={this.state.sorted_exercises[bodypart]} filter={this.state.filter}/>
            </div>)
        }
        else
        {
            return (<div>
                <h1 className="body-part-header" onClick={() => this.expandOnClick(bodypart)}>{bodypart}</h1>
            </div>) 
        }
    }

    searchFilterChange(e){
        let new_filter = this.state.filter;
        new_filter.text = e.target.value.toLowerCase();
        this.setState({filter: new_filter});
    }

    equipmentCheckboxChange(e){
        let name_of_changed = e.target.name;
        console.log(name_of_changed);
        let new_filter = this.state.filter;
        if (new_filter.equipment.includes(name_of_changed)){
            let i = new_filter.equipment.indexOf(name_of_changed);
            new_filter.equipment.splice(i, 1);
        }
        else{
            new_filter.equipment.push(name_of_changed);
        }
        this.setState({filter: new_filter});
    }

    expandOnClick(bodypart){
        let new_expanded_categories = this.state.expanded_categories;
        new_expanded_categories[bodypart] = !new_expanded_categories[bodypart];
        this.setState({expanded_categories: new_expanded_categories});
    }

    render(){
        if(this.state)
            return (<div className="all-exercises">
                <div id="filters">
                    <input type="search" placeholder="Search.." onChange={(e) => this.searchFilterChange(e)}></input>
                    <div id="equipment-filter">
                        <p>Equipment:</p>
                        <div id="equipment-checkboxes">
                            {this.state.possible_equipment.map(piece_of_equipment => <div className="equipment-checkbox"><input type="checkbox" name={piece_of_equipment} onChange={(e) => this.equipmentCheckboxChange(e)}></input> {piece_of_equipment}</div>)}
                        </div>
                    </div>
                </div>
                <div>{Object.keys(this.state.sorted_exercises).map((exercise) => this.bodypartList2Table(exercise))}</div>
            </div>)
    }
}


SortedExerciseTables.defaultProps = {
    listOfExercises: []
}

SortedExerciseTables.propTypes = {
    listOfExercises: PropTypes.array.isRequired
}


export default SortedExerciseTables;