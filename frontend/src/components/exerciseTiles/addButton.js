import React from 'react';
import "../../assets/css/addButton.css"

export default class AddButton extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            addToCart: props.addToCart,
            exercise: props.exercise,
            remove: false
        }
    }

    render(){
        return (<button className={!this.state.remove ? "cart-btn btn-add" : "cart-btn btn-remove"} onClick={(e) => {
            e.stopPropagation();
            this.state.addToCart(this.state.exercise);
            this.setState({remove: !this.state.remove});
        }}>{!this.state.remove ? 'Add' : 'Remove'}</button>)
    }
    
}