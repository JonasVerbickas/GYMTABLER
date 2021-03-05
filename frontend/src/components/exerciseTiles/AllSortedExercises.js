import MansonryWithHeader from './MasonryWithHeader.js';
import ExerciseTileFilters from './ExerciseTableFilters.js';
import ExerciseCart from './exerciseCart.js'
import "../../assets/css/allSortedExercises.css";
import PropTypes from 'prop-types';
import React from 'react';


class AllSortedExercises extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sorted_exercises: {},
            possible_equipment: [],
            filter: {text: "", equipment: []},
            cart: []
        };
        this.addExerciseToCart = this.addExerciseToCart.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    componentDidMount()
    {
        fetch("http://127.0.0.1:8000/get_exercises")
            .then(res => res.json())
            .then((result) => {
                if(result)
                {
                    console.log(result);
                    this.setState({ sorted_exercises: result });
                }
                else
                {

                }
            });
    }

    // cia sukuriam pagrindi metoda, kuris keis state, ir duodam kaip prop <ExerciseTableFilters onFilterChange={metodas}/>

    onFilterChange(new_filter){
        this.setState({filter: new_filter});
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

    render(){
        if(Object.keys(this.state.sorted_exercises).length > 0)
        {
           return (<div id="exercise-tables-and-filters">
               <ExerciseTileFilters onFilterChange={this.onFilterChange} possible_equipment={this.state.possible_equipment} filter={this.state.filter} />
                <div id="all-exercise-tables-with-headers">
                    {Object.keys(this.state.sorted_exercises).map((bodypart) => (<MansonryWithHeader key={bodypart} bodypart={bodypart} listOfExercises={this.state.sorted_exercises[bodypart]} filter={this.state.filter} addToCart={this.addExerciseToCart} />))}
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