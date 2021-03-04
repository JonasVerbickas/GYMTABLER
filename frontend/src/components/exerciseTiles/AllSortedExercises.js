import TableForASpecificBodypart from './TableWithHeader.js';
import ExerciseTileFilters from './ExerciseTableFilters.js';
import "../../assets/css/allSortedExercises.css";
import PropTypes from 'prop-types';
import React from 'react';


class AllSortedExercises extends React.Component {
    constructor(props){
        super(props);
        let sorted_exercises = {};  // stores all possible exercises sorted by bodypart
        let possible_equipment = [];  // list of every possible piece of equipment used
        // sort the dataset
        // should probably be done on the backend
        props.listOfExercises.forEach(function (exercise) {
            if (exercise) {
                if (exercise.bodypart) {
                    exercise.bodypart.forEach(function (bp) {
                        Object.keys(sorted_exercises).includes(bp) ? sorted_exercises[bp].push(exercise) : sorted_exercises[bp] = [exercise];
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
            possible_equipment: possible_equipment,
            filter: {text: "", equipment: []}
        };
        this.searchFilterChange =  this.searchFilterChange.bind(this);
        this.equipmentCheckboxChange = this.equipmentCheckboxChange.bind(this);
        console.log(sorted_exercises);
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

    render(){
        if(this.state)
            return (<div className="all-exercises">
                <ExerciseTileFilters searchChange={this.searchFilterChange} equipmentChange={this.equipmentCheckboxChange} possible_equipment={this.state.possible_equipment}/>
                <div>
                    {Object.keys(this.state.sorted_exercises).map((bodypart) => (<TableForASpecificBodypart key={bodypart} bodypart={bodypart} listOfExercises={this.state.sorted_exercises[bodypart]} filter={this.state.filter}/>))}
                </div>
            </div>)
    }
}

AllSortedExercises.propTypes = {
    listOfExercises: PropTypes.array.isRequired
}

export default AllSortedExercises;