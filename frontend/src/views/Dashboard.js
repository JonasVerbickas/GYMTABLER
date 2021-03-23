import React from 'react';
import Exercise from '../components/dashboard/DashboardExercise.js';
import Category from '../components/dashboard/DashboardCategory.js';
import Dropdown from '../components/dashboard/DashboardDropdown.js';
import DashboardVideo from '../components/dashboard/DashboardVideo.js';
import "../assets/css/dashboard.css"


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video_link: ""
    };
    this.handleWorkoutChange = this.handleWorkoutChange.bind(this);
  }

  componentDidMount(){
    fetch("http://127.0.0.1:8000/workout/get_prebuilt/")
      .then(res => res.json())
      .then((response) => {
        console.log("dashboard response[0]", response[0]);
        this.setState({workouts: response, selected_index: 0});
      })
  }

  adjustedExerciseLink(exercise_link){
    return exercise_link.replace("watch?v=", "embed/");
  } 

  handleClick(exercise)
  {
    let link = exercise.link;
    let adjusted_link = this.adjustedExerciseLink(link);
    this.setState({video_link: adjusted_link});
  }

  handleWorkoutChange(event)
  {
    console.log(event.target.value);
    this.setState({ selected_index: event.target.value })
  }

  render()
  {
    if(this.state.workouts)
    {
      return (
        <div className="dashboard">
          <div className='dashboard-table'>
            <Dropdown workouts={this.state.workouts} handleWorkoutChange={this.handleWorkoutChange}/>
            {this.state.workouts[this.state.selected_index].exercises.map(exercise => <Exercise key={exercise.name} exercise={exercise} onClick={() => this.handleClick(exercise)} />)}
          </div>
          <DashboardVideo video_link={this.state.video_link} />
        </div>
      );
    }
    else
    {
      return <h1>Failed to fetch workouts</h1>
    }
  }
}

export default Dashboard;
