import ExerciseTileTable from './ExerciseTileTable.js';
import ExerciseTileFilters from './ExerciseTileFilters.js';
import "../assets/css/sortedExerciseTables.css"
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring/renderprops'
import React from 'react';

class SortedExerciseTables extends React.Component {
    constructor(props){
        super(props);
        let sorted_exercises = {};  // stores all possible exercises sorted by bodypart
        let expanded_categories = {};
        let possible_equipment = [];  // list of every possible piece of equipment used
        // sort the dataset
        // should probably be done on the backend
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
        this.searchFilterChange =  this.searchFilterChange.bind(this);
        this.equipmentCheckboxChange = this.equipmentCheckboxChange.bind(this);
    }

    bodypartList2Table(bodypart) {
        return (<div>
            <h2 className="body-part-header" onClick={() => this.expandOnClick(bodypart)}>{bodypart}</h2>
            <Transition
                native
                items={this.state.expanded_categories[bodypart]}
                from={{ overflow: 'hidden', height: 0 }}
                enter={[{ height: 'auto'}]}
                leave={{ height: 0 }}>
                {show =>
                    show && (props => (
                    <animated.div style={props}>
                        <ExerciseTileTable listOfExercises={this.state.sorted_exercises[bodypart]} filter={this.state.filter} />
                    </animated.div>
                    ))}
            </Transition>
        </div>)
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
                <ExerciseTileFilters searchChange={this.searchFilterChange} equipmentChange={this.equipmentCheckboxChange} possible_equipment={this.state.possible_equipment}/>
                <div>
                    {Object.keys(this.state.sorted_exercises).map((exercise) => this.bodypartList2Table(exercise))}
                </div>
            </div>)
    }
}


SortedExerciseTables.propTypes = {
    listOfExercises: PropTypes.array.isRequired
}


export default SortedExerciseTables;