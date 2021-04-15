import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'

import InputPage from './views/InputPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './views/Dashboard.js'
import LoginPage from './views/LoginPage'
import Workouts from './views/WorkoutsPage'
import CreateWorkout from './views/CreateWorkout'
import WorkoutPage from './views/WorkoutPage'

import Login from './containers/Login';
import SignUp from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="wrapper">
          <div className="main">
            <ToastContainer />
            <Switch>
            <Route exact path="/" component={Home} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/workouts/:id" component={WorkoutPage} />
              <Route exact path="/workouts" component={Workouts} />
              <Route exact path="/createworkout" component={CreateWorkout} />
              <Route exact path="/login" component={Login} />
              <Route exact path='/signup' component={SignUp}/>
              <Route exact path='/reset-password' component={ResetPassword}/>
              <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}/>
              <Route exact path='/activate/:uid/:token' component={Activate}/>
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
