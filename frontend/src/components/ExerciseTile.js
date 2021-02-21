import React from 'react';
import PropTypes from 'prop-types';
import "../exerciseTile.css"

class ExerciseTile extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            img: props.img,
            title: props.title,
            expanded: false
        }
    }

    render(){
        let class_name;
        if(!this.state.expanded)
        {
            class_name = "exercise-tile small-exercise-tile";
        }
        else
        {
            class_name = "exercise-tile expanded-exercise-tile";
        }
        return (
            <div className={class_name} onClick={() => this.setState({expanded: !this.state.expanded})}>
                <img src={this.state.img} alt={this.state.title}></img>
                <p>{this.state.title}</p>
            </div>
        );
    }
    
}

ExerciseTile.defaultProps = {
    img: "https://www.muscletech.com/wp-content/uploads/muscletech-add-50-lbs-to-your-bench-press.jpg",
    title: "Placeholder title",
}

ExerciseTile.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string
}

export default ExerciseTile;