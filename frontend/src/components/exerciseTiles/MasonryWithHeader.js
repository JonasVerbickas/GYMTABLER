import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring/renderprops'
import ExerciseTileMansonry from './ExerciseTileMansonry.js';
import "../../assets/css/tableWithHeader.css"


function MansonryWithHeader (props) {
    return (<div className="header-with-table">
        <h2 className="body-part-header" onClick={() => props.expandOnClick()}>{props.bodypart}</h2>
        <Spring
            native
            to={{ height: props.expanded ?  "auto" : 0}}>
            {({ height }) =>
                <animated.div style={{ height: height, overflow: "hidden"}}>
                    <ExerciseTileMansonry listOfExercises={props.listOfExercises} filter={props.filter} getExerciseCartStatus={props.getExerciseCartStatus} addToCart={props.addToCart}/>
                    </animated.div>
                }
        </Spring>
    </div>);
}


MansonryWithHeader.propTypes = {
    bodypart: PropTypes.string.isRequired,
    listOfExercises: PropTypes.array.isRequired,
    filter: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    expandOnClick: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired
}

export default MansonryWithHeader;