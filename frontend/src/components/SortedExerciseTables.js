import ExerciseTileTable from './ExerciseTileTable.js';
import "../sortedExerciseTables.css"
import PropTypes from 'prop-types';
import React from 'react';

class SortedExerciseTables extends React.Component {

    constructor(props){
        super(props);
        let sorted_exercises = {};
        let expanded_exercises = {};
        props.listOfExercises.forEach(function (exercise) {
            if (exercise) {
                if (exercise.bodypart) {
                    exercise.bodypart.forEach(function (bp) {
                        if (Object.keys(sorted_exercises).includes(bp)) {
                            sorted_exercises[bp].push(exercise);
                        }
                        else {
                            sorted_exercises[bp] = [exercise];
                            expanded_exercises[bp] = false;
                        }
                    })
                }
            }
        });
        this.state = {
            listOfExercises: props.listOfExercises,
            sorted_exercises: sorted_exercises,
            expanded_exercises: expanded_exercises,
            filter: {text: ""}
        };
    }

    bodypartList2Table(bodypart){
        if(this.state.expanded_exercises[bodypart])
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

    onTextFilterChange(e){
        let new_filter = this.state.filter;
        new_filter.text = e.target.value.toLowerCase();
        this.setState({filter: new_filter});
    }

    expandOnClick(bodypart){
        let new_expanded_exercises = this.state.expanded_exercises;
        new_expanded_exercises[bodypart] = !new_expanded_exercises[bodypart];
        this.setState({expanded_exercises: new_expanded_exercises});
    }

    render(){
        if(this.state)
            return (<div className="all-exercises">
                <input type="text" placeholder="Search.." onChange={(e) => this.onTextFilterChange(e)}></input>
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