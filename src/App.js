import React, { Component } from 'react';
import './App.css';
import { WeatherDetails } from './components/weatherData/WeatherDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h1 className="my-3">Current Weather</h1>
              <WeatherDetails />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
