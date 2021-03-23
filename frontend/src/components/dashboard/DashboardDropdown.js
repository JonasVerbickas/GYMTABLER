export default function Dropdown(props) {
  return (
    <select
      className="dashboard-dropdown"
      name="curr_workout"
      id="curr_workout"
      onChange={(event) => props.handleWorkoutChange(event)}
    >
      {props.workouts.map((workout, index) => (
        <option key={index} value={index}>
          {workout.slug}
        </option>
      ))}
    </select>
  );
}
