import React from 'react';
import PropTypes from 'prop-types';
import "../../assets/css/exerciseTile.css";
import SmallExerciseTile from "./SmallExerciseTile.js";
import ExpandedExerciseTile from "./ExpandedExerciseTile.js";


function URL2IMG(link) {
    if (link) {
        if (link.includes("youtube.com")) {

            if (link[link.length - 1] === "/") {
                link = link.slice(0, link.length - 1)
            }
            let video_id = link.slice(link.length - 11, link.length);
            let thumbnail_link = "http://img.youtube.com/vi/" + video_id + "/0.jpg";
            return thumbnail_link;
        }
    }
    return null;
}


function fillInBlanksInExercise(exercise) {
    const default_exercise = {
        img: null,
        name: "Placeholder title",
        description: "A short description about the exercise",
        difficulty: "X",
        equipment: ["None"],
        bodypart: ["Lorem", "Ipsum"],
        link: null
    }
    let adjusted_exercise = {};
    Object.keys(default_exercise).forEach(function (key) {
        adjusted_exercise[key] = exercise[key] ? exercise[key] : default_exercise[key];
    });
    adjusted_exercise.img = URL2IMG(exercise.link);
    return adjusted_exercise;
}


class ExerciseTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise: fillInBlanksInExercise(props.exercise),
            expanded: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        if (!this.state.expanded) {
            return (<SmallExerciseTile handleClick={this.handleClick} exercise={this.state.exercise}/>);
        }
        else {
            return (<ExpandedExerciseTile handleClick={this.handleClick} exercise={this.state.exercise} />);
        }
    }
}


ExerciseTile.propTypes = {
    exercise: PropTypes.object.isRequired,
}


export default ExerciseTile;