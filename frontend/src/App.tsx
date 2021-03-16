import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './views/Home'

import InputPage from './views/InputPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './views/Dashboard.js'
import LoginPage from './views/LoginPage'
import Workouts from './views/WorkoutsPage'

function App() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  },[]);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="wrapper">
        <div className="main">
        <ToastContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/workouts" component={Workouts} />
            <Route exact path="/input" component={InputPage} />
            <Route exact path="/loginpage" component={LoginPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
