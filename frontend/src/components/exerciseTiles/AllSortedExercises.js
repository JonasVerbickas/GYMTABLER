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
            filter: Object.assign({}, EMPTY_FILTER),
            cart: [],
            expanded: [] // keeps track of the expansion state for each of the categories
        };
        this.addExerciseToCart = this.addExerciseToCart.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.expandACategory = this.expandACategory.bind(this);
    }

    componentDidMount()
    {
        fetch("http://127.0.0.1:8000/get_exercises")
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this.setState({ sorted_exercises: result, expanded: Object.keys(result).map(() => false) });
            });
    }

    onFilterChange(new_filter){
        let compared_to_empty = Object.keys(new_filter).map(key => (EMPTY_FILTER[key] === new_filter[key]));
        let back_to_being_empty = !compared_to_empty.includes(false);
        if (back_to_being_empty)
        {
            this.setState({ filter: new_filter, expanded: this.state.expanded.map(() => false) });
        }
        else
        {
            this.setState({ filter: new_filter, expanded: this.state.expanded.map(() => true) });
        }
    }
    
    addExerciseToCart(new_exercise){
        let new_cart = this.state.cart;
        let index = this.state.cart.map(old_exercise => old_exercise.name).indexOf(new_exercise.name);
        if (index > -1)
        {
            new_cart.splice(index, 1);
        }
        else
        {
            new_cart.push(new_exercise);
        }
        this.setState({cart: new_cart});
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
               <ExerciseTileFilters onFilterChange={this.onFilterChange} possible_equipment={this.state.possible_equipment} filter={this.state.filter} />
                <div id="all-exercise-tables-with-headers">
                    {Object.keys(this.state.sorted_exercises).map((bodypart, index) => (<MansonryWithHeader key={bodypart} bodypart={bodypart} listOfExercises={this.state.sorted_exercises[bodypart]} filter={this.state.filter} addToCart={this.addExerciseToCart} expanded={this.state.expanded[index]} expandOnClick={() => this.expandACategory(index)} />))}
                </div>
                <ExerciseCart cart={this.state.cart} />
            </div>)
        }
        else
        {
            return <h1 style={{color: 'red'}}>Fetching data from server</h1>
        }
    }
}

export default AllSortedExercises;