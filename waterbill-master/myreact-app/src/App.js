import React, { Component } from 'react';
import logo from './images/water_save.png';
import './App.css';
import Userlogin from './Login/Userlogin'
import Testing1 from './Login/Testing1'
import Testing2 from './Login/Testing2'
import { BrowserRouter as Router} from 'react-router-dom'
import { Route, Redirect } from 'react-router'


class App extends Component {

  render() {
    return (
      <div className="App">
      <Router>
        <div>

        <Route exact path="/" component={Testing2}/>

        <Route exact path="/n" component={Userlogin}/>

        <Route exact path="/news" component={Testing1}/>
        </div>
      </Router>
      </div>

    );
  }
}
export default App;
