import PropTypes from 'prop-types';
import React from 'react';
import { Spring, animated } from 'react-spring/renderprops'
import ExerciseTileTable from './ExerciseTileTable.js';
import "../../assets/css/tableWithHeader.css"


class TableWithHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bodypart: props.bodypart,
            listOfExercises: props.listOfExercises,
            filter: props.filter,
            addToCart: props.addToCart,
            expaded: false
        }
    }
    render(){
        return (<div className="header-with-table">
            <h2 className="body-part-header" onClick={() => this.expandOnClick()}>{this.state.bodypart}</h2>
            <Spring
                native
                to={{ height: this.state.expaded ?  "auto" : 0}}
                onRest={() => console.log('done')}>
                {({ height }) =>
                    <animated.div style={{ height: height, overflow: "hidden"}}>
                            <ExerciseTileTable listOfExercises={this.state.listOfExercises} filter={this.state.filter} addToCart={this.state.addToCart} />
                        </animated.div>
                    }
            </Spring>
        </div>)
    }
    
    expandOnClick(){
        this.setState({expaded: !this.state.expaded});
    }
}


TableWithHeader.propTypes = {
    bodypart: PropTypes.string.isRequired,
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
}

export default TableWithHeader;