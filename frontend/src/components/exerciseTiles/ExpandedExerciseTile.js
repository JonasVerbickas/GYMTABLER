export default function ExpandedExerciseTile(props) {
    return (
        <div className="exercise-tile-border">
            <div className="exercise-tile expanded-exercise-tile" onClick={() => props.expandOnClick()}>
                <img src={props.exercise.img} alt={props.exercise.name + " image"}></img>
                <h3 className="exercise-title">{props.exercise.name}</h3>
                <div className="exercise-stats">
                    <div className="exercise-stats-row">
                        <p className="exercise-description">{props.exercise.description}</p>
                    </div>
                    <div className="exercise-stats-row" style={{ justifyContent: "space-around" }}>
                        <p>Difficulty level: {props.exercise.difficulty}</p>
                    </div>
                    <div className="exercise-stats-row">
                        <p>Equipment needed:</p>
                        <ul>
                            {props.exercise.equipment.map(function (equipment, i) {
                                return <li key={i}>{equipment}</li>
                            })}
                        </ul>
                    </div>
                    <div className="exercise-stats-row">
                        <p>Muscle groups:</p>
                        <ul>
                            {/*props.exercise.bodypart*/[].map(function (bodypart, i) {
                                return <li key={i}>{bodypart}</li>
                            })}
                        </ul>
                    </div>
                    <div className="exercise-stats-row" onClick={(e) => (e.stopPropagation())}>
                        <a href={props.exercise.link} target="_blank" style={{ fontWeight: 400 }}>VIDEO</a>
                    </div>
                </div>
            </div>
        </div>

    );
}