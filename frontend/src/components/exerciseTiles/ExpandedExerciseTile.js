function statsColumn(title, list) {
  console.log(list);
  return (
    <div className="exercise-stats-column">
      <h6 style={{ borderBottom: "solid black 1px" }}>{title}</h6>
      {list.length > 0 ? (
        list.map(function (equipment, i) {
          return <p key={i}>{equipment}</p>;
        })
      ) : (
        <p>None</p>
      )}
    </div>
  );
}

export default function ExpandedExerciseTile(props) {
  return (
    <div className="exercise-tile-border">
      <div
        className="exercise-tile expanded-exercise-tile"
        onClick={() => props.expandOnClick()}
      >
        <img
          src={props.exercise.img}
          alt={props.exercise.name + " image"}
        ></img>
        <h3 className="exercise-title">{props.exercise.name}</h3>
        <p>Difficulty level: {props.exercise.difficulty}</p>
        <div className="exercise-stats">
          <div className="exercise-stats-row">
            <p className="exercise-description">{props.exercise.description}</p>
          </div>
          <div className="exercise-stats-row">
            {statsColumn("Muscle groups", props.exercise.bodypart)}
            {statsColumn("Equipment needed", props.exercise.equipment)}
          </div>
          <div
            className="exercise-stats-row"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={props.exercise.link}
              target="_blank"
              style={{ fontWeight: 400, color: "darkmagenta" }}
            >
              VIDEO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
