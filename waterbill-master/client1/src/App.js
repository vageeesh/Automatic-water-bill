import React, { Component } from 'react';
import logo from './images/water_save.png';
import './App.css';
import Userlogin from './Login/Userlogin'
import UserLogin from './Login/UserLogin'
import Testing1 from './Login/Testing1'
import Testing2 from './Login/Testing2'
import AdminPage from './Login/AdminPage'
import AdminLogin from './Login/AdminLogin'
import billGenerationPage from './Login/billGenerationPage'
import { BrowserRouter as Router} from 'react-router-dom'
import { Route, Redirect } from 'react-router'

  //<Route exact path="/Userlogin" component={Userlogin}/>




class App extends Component {

  render() {
    return (
      <div className="App">
      <Router>
        <div>

        <Route exact path="/news" component={Testing2}/>



        <Route exact path="/" component={Userlogin}/>

        <Route exact path="/news1" component={Testing1}/>

        <Route exact path="/AdminLogin" component={AdminLogin}/>

        <Route exact path="/adminpage" component={AdminPage}/>

        <Route exact path="/billGenerationPage" component={billGenerationPage}/>
        </div>
      </Router>
      </div>

    );
  }
}
export default App;
