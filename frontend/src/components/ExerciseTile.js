import React from 'react';
import PropTypes from 'prop-types';
import "../exerciseTile.css"

const default_exercise = {
    img: "https://www.muscletech.com/wp-content/uploads/muscletech-add-50-lbs-to-your-bench-press.jpg",
    title: "Placeholder title",
    difficulty: "X",
    equipment: ["None"],
    muscle_groups: ["Lorem", "Ipsum"]
}


class ExerciseTile extends React.Component {
    constructor(props) {
        super(props);
        let adjusted_exercise = {};
        Object.keys(default_exercise).forEach(function (key) {
            adjusted_exercise[key] = props.exercise[key] ? props.exercise[key] : default_exercise[key];
        })
        this.state = {
            img: adjusted_exercise.img,
            title: adjusted_exercise.title,
            difficulty: adjusted_exercise.difficulty,
            equipment: adjusted_exercise.equipment,
            muscle_groups: adjusted_exercise.muscle_groups,
            expanded: false
        }
    }

    render() {
        if (!this.state.expanded) {
            let class_name = "exercise-tile small-exercise-tile";
            return (
                <div className={class_name} onClick={() => this.setState({ expanded: !this.state.expanded })}>
                    <img src={this.state.img} alt={this.state.title}></img>
                    <p className="exercise-title">{this.state.title}</p>
                </div>
            );
        }
        else {
            let class_name = "exercise-tile expanded-exercise-tile";
            return (
                <div className={class_name} onClick={() => this.setState({ expanded: !this.state.expanded })}>
                    <img src={this.state.img} alt={this.state.title}></img>
                    <p className="exercise-title">{this.state.title}</p>
                    <div className="exercise-stats">
                        <div className="exercise-stats-row">
                            <p className="exercise-description">A short description about the exercise</p>
                        </div>
                        <div className="exercise-stats-row">
                            <p>Difficulty level: {this.state.difficulty}</p>
                        </div>
                        <div className="exercise-stats-row">
                            <p>Equipment needed:</p>
                            <ul> 
                                {this.state.equipment.map(function (equipment, i) {
                                    return <li key={"equipment:"+i}>{equipment}</li>
                                })}
                            </ul>
                        </div>
                        <div className="exercise-stats-row">
                            <p>Muscle groups:</p>
                            <ul> 
                                {this.state.muscle_groups.map(function (muscle_groups, i) {
                                    return <li key={"muscle_group:"+i}>{muscle_groups}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

ExerciseTile.defaultProps = {
    exercise: default_exercise
}

ExerciseTile.propTypes = {
    exercise: PropTypes.object,
}

export default ExerciseTile;