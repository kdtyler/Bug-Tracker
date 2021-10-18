import React, { Component } from 'react';
//import FirstComponent from './components/learning-examples/FirstComponent';
//import SecondComponent from './components/learning-examples/SecondComponent';
//import ThirdComponent from './components/learning-examples/ThirdComponent';
import BugTracker from './components/bugtracker/BugTrackerApp'
import './App.css';
import './bootstrap.css';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <BugTracker></BugTracker>
      </div>
    );
  }
}

export default App;
