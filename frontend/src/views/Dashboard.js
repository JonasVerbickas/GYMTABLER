import React from 'react';
import Exercise from '../components/DashboardExercise.js';
import Category from '../components/DashboardCategory.js';
import Video from '../components/Video.js';
import "../dashboard.css"


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video_link: ""
    };
  }

  exercise2link(exercise)
  {
    let converter = { "Bench Press": "https://www.youtube.com/embed/rT7DgCr-3pg",
                      "Deadlift": "https://www.youtube.com/embed/SaYX-7emO4U"};
    
    if (Object.keys(converter).indexOf(exercise) > -1)
    {
      return converter[exercise];
    }
    else
    {
      return "";
    }
  }

  handleClick(ex_name)
  {
    let link = this.exercise2link(ex_name);
    this.setState({video_link: link});
  }

  renderExercise(ex_name)
  {
    return (
      <Exercise
        name={ex_name}
        onClick={() => this.handleClick(ex_name)}
      />
    );
  }

  renderCategory(cat_name)
  {
    return (
      <Category cat_name={cat_name}/>
    )
  }

  render()
  {
    return (
      <div className="dashboard">
        <table className='dashboard-table'>
            {this.renderCategory("Day1")}
            {this.renderExercise("Bench Press")}
            {this.renderExercise("Deadlift")}
            {this.renderCategory("Day2")}
            {this.renderExercise("Bench Press")}
            {this.renderExercise("Deadlift")}
        </table>
        <Video video_link={this.state.video_link}/>
      </div>
    );
  }
}

export default Dashboard;
