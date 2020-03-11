import React, { Component } from 'react';
import './App.css';
import { WeatherDetails } from './components/weatherData/WeatherDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Weather</h1>
          <WeatherDetails />
        </div>
      </div>
    );
  }
}

export default App;
