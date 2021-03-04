import PropTypes from 'prop-types';
import React from 'react';
import { Transition, animated } from 'react-spring/renderprops'
import ExerciseTileTable from './ExerciseTileTable.js';
import "../../assets/css/tableWithHeader.css"


class TableWithHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bodypart: props.bodypart,
            listOfExercises: props.listOfExercises,
            filter: props.filter,
            expaded: false
        }
    }
    render(){
        return (<div>
            <h2 className="body-part-header" onClick={() => this.expandOnClick()}>{this.state.bodypart}</h2>
            <Transition
                native
                items={this.state.expaded}
                from={{ overflow: 'hidden', height: 0 }}
                enter={[{ height: 'auto' }]}
                leave={{ height: 0 }}>
                {show =>
                    show && (props2 => (
                        <animated.div style={props2}>
                            <ExerciseTileTable listOfExercises={this.state.listOfExercises} filter={this.state.filter} />
                        </animated.div>
                    ))}
            </Transition>
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
}

export default TableWithHeader;