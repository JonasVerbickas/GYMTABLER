import MansonryWithHeader from './MasonryWithHeader.js';
import ExerciseTileFilters from './ExerciseTableFilters.js';
import ExerciseCart from './exerciseCart.js'
import "../../assets/css/allSortedExercises.css";
import React from 'react';

const EMPTY_FILTER = { text: "", equipment: [] }

class AllSortedExercises extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sorted_exercises: {},
            possible_equipment: [],
            filter: this.deepObjectCopy(EMPTY_FILTER),
            old_expansion_states: [],  // is used to remember the expanded categories before a filter was applied AND later to restore their state after the filter becomes EMPTY again
            cart: [],  // uses exercise.name that way works better with duplicates
            expanded: []  // keeps track of the expansion state for each of the categories
        };
        this.addExerciseToCart = this.addExerciseToCart.bind(this);
        this.getExerciseCartStatus = this.getExerciseCartStatus.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.expandACategory = this.expandACategory.bind(this);
        this.removeExerciseFromCart = this.removeExerciseFromCart.bind(this);
    }

    getEquipementFromExercise(exercise_obj) {
        if (exercise_obj['equipment']) {
            let exercises_equipment = exercise_obj['equipment'].replaceAll("'", "\"");
            let parsed = JSON.parse(exercises_equipment);
            return parsed;
        }
        else {
            return [];
        }
    }

    getAllPossibleEquipent(response)
    {
        let equipment = [];
        Object.keys(response).forEach((key) => {
            response[key].forEach((exercise) => {
                exercise['equipment'].forEach(e => {
                    if (!equipment.includes(e)) {
                        equipment.push(e);
                    }
                }
                )
            })
        })
        return equipment;
    }

    adjustResponse(response)
    {
        Object.keys(response).forEach((key) => {
            response[key].forEach((exercise) => {
                let eq = this.getEquipementFromExercise(exercise);
                exercise['equipment'] = eq;
                let bp = exercise['bodypart'].split(",");
                exercise['bodypart'] = bp;
            })
        })
    }

    fetchJSON()
    {
        function wait(delay) {
            return new Promise((resolve) => setTimeout(resolve, delay));
        }
        function fetchRetry(url, delay, tries, fetchOptions = {}) {
            function onError(err) {
                let triesLeft = tries - 1;
                if (!triesLeft) {
                    throw err;
                }
                return wait(delay).then(() => fetchRetry(url, delay, triesLeft, fetchOptions));
            }
            return fetch(url, fetchOptions).catch(onError);
        }
        fetchRetry("http://127.0.0.1:8000/mainget_exercises", 5000, 5)
            .then(res => res.json())
            .then((response) => {
                console.log("Server response:", response);
                this.adjustResponse(response);
                console.log("Adjusted:", response);
                let expansion_states = Object.keys(response).map(() => false);
                let all_equipment = this.getAllPossibleEquipent(response);
                this.setState({ sorted_exercises: response, possible_equipment: all_equipment, expanded: expansion_states.slice(), old_expansion_states: expansion_states.slice() });
            })
    }

    componentDidMount()
    {
        this.fetchJSON()
    }

    compareFilterToEmpty(filter){
        // compare everything both filters
        let compared_to_empty = Object.keys(filter).map(key => (EMPTY_FILTER[key].length === filter[key].length));
        // if there is at least one miss match return false
        return !compared_to_empty.includes(false);
    }
    
    deepObjectCopy(obj){
        return JSON.parse(JSON.stringify(obj));
    }


    // new_filter param is a DEEP copy of this.state.filters after one change
    onFilterChange(new_filter){
        let back_to_being_empty = this.compareFilterToEmpty(new_filter);
        if (back_to_being_empty)
        {
            console.log("ALL FILTERS ARE GONE!");
            let old_expansion_states = this.state.old_expansion_states.slice();
            this.setState({ filter: new_filter, expanded: old_expansion_states });
        }
        else
        {
            let old_expansion_states;
            // if the filter before this change was empty
            // save the current category expansion state
            if(this.compareFilterToEmpty(this.state.filter))
            {
                old_expansion_states = this.state.expanded.slice();
            }
            // otherwise don't change it
            else
            {
                old_expansion_states = this.state.old_expansion_states;
            }
            // only expand everything if nothing is expanded yet
            let new_expansion_states;
            if(!this.state.expanded.includes(true))
            {
                new_expansion_states = this.state.expanded.map(() => true);
            }
            else
            {
                new_expansion_states = this.state.expanded;
            }
            this.setState({ filter: new_filter, old_expansion_states: old_expansion_states, expanded: new_expansion_states});
        }
    }
    
    addExerciseToCart(new_exercise){
        let new_cart = this.state.cart;
        let index = this.state.cart.indexOf(new_exercise.name);
        if (index > -1)
        {
            new_cart.splice(index, 1);
        }
        else
        {
            new_cart.push(new_exercise.name);
        }
        this.setState({cart: new_cart});
    }

    removeExerciseFromCart(to_remove_name) {
        let new_cart = this.state.cart;
        let index = this.state.cart.indexOf(to_remove_name);
        if (index > -1) {
            new_cart.splice(index, 1);
        }
        this.setState({ cart: new_cart });
    }

    getExerciseCartStatus(exercise_name){
        let status = this.state.cart.includes(exercise_name);
        return status;
    }

    expandACategory(index){
        let curr_expanded = this.state.expanded;
        curr_expanded[index] = !curr_expanded[index];
        this.setState({expanded: curr_expanded});
    }

    render(){
        if(Object.keys(this.state.sorted_exercises).length > 0)
        {
           return (<div id="exercise-tables-and-filters">
               <ExerciseTileFilters onFilterChange={this.onFilterChange} possible_equipment={this.state.possible_equipment} filter={this.deepObjectCopy(this.state.filter)} />
                <div id="all-exercise-tables-with-headers">
                   {Object.keys(this.state.sorted_exercises).map((bodypart, index) => (<MansonryWithHeader key={bodypart} bodypart={bodypart} listOfExercises={this.state.sorted_exercises[bodypart]} filter={this.state.filter} addToCart={this.addExerciseToCart} expanded={this.state.expanded[index]} expandOnClick={() => this.expandACategory(index)} getExerciseCartStatus={this.getExerciseCartStatus} />))}
                </div>
                <ExerciseCart cart={this.state.cart} removeFromCart={this.removeExerciseFromCart} />
            </div>)
        }
        else
        {
            return <h1 style={{color: 'red', textAlign: 'center', fontWeight: 'bolder'}}>Fetching data from server...</h1>
        }
    }
}

export default AllSortedExercises;