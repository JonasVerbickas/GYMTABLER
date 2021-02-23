import React from 'react';
import PropTypes from 'prop-types';
import "../exerciseTile.css"

const default_exercise = {
    img: null,
    name: "Placeholder title",
    difficulty: "X",
    equipment: ["None"],
    bodypart: ["Lorem", "Ipsum"],
    link: null
}


class ExerciseTile extends React.Component {
    URL2IMG(link){
        if (link) {
            console.log(link);
            if (link.includes("youtube.com")) {

                if (link[link.length - 1] === "/") {
                    link = link.slice(0, link.length - 1)
                }
                let video_id = link.slice(link.length - 11, link.length);
                let thumbnail_link = "http://img.youtube.com/vi/" + video_id + "/0.jpg";
                console.log(thumbnail_link);
                return thumbnail_link;
            }
        }
        return null;
    }

    constructor(props) {
        super(props);
        let adjusted_exercise = {};
        Object.keys(default_exercise).forEach(function (key) {
            adjusted_exercise[key] = props.exercise[key] ? props.exercise[key] : default_exercise[key];
        })
        this.state = {
            img: adjusted_exercise.img,
            name: adjusted_exercise.name,
            difficulty: adjusted_exercise.difficulty,
            equipment: adjusted_exercise.equipment,
            bodypart: adjusted_exercise.bodypart,
            link: adjusted_exercise.link,
            expanded: false
        }
        this.state.img = this.URL2IMG(this.props.exercise.link);
    }

    render() {
        if (!this.state.expanded) {
            let class_name = "exercise-tile small-exercise-tile";
            return (
                <div className={class_name} onClick={() => this.setState({ expanded: !this.state.expanded })}>
                    <img src={this.state.img} alt={this.state.name}></img>
                    <p className="exercise-title">{this.state.name}</p>
                </div>
            );
        }
        else {
            let class_name = "exercise-tile expanded-exercise-tile";
            return (
                <div className={class_name} onClick={() => this.setState({ expanded: !this.state.expanded })}>
                    <img src={this.state.img} alt={this.state.name}></img>
                    <p className="exercise-title">{this.state.name}</p>
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
                                {this.state.bodypart.map(function (bodypart, i) {
                                    return <li key={"muscle_group:"+i}>{bodypart}</li>
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