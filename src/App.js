import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { GetZipcode } from './components/locations/GetZipcode';

class App extends Component {
  state = {
    location: null,
    weatherdata: []
  };

  getWeatherData = async location => {
    this.setState({ location: null, weatherdata: [] });

    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&mode=json&appid=${process.env.REACT_APP_WEATHER_KEY}`
    );

    // Create object key
    const data = res.data;
    if (this.state.weatherdata.length === 0) {
      data.key = 0;
    } else {
      data.key = this.state.weatherdata.length;
    }

    // Sunrise
    var sunrise = data.sys.sunrise;
    sunrise = new Date(sunrise * 1000);
    sunrise = sunrise.toString();

    var sunriseH = sunrise.slice(16, 18);
    var sunriseM = sunrise.slice(19, 21);
    var sunriseS = sunrise.slice(22, 24);
    sunriseH = parseInt(sunriseH);
    sunriseM = parseInt(sunriseM);
    sunriseS = parseInt(sunriseS);

    sunrise = `${sunriseH}:${sunriseM}:${sunriseS} am`;
    data.sys.sunrise = sunrise;

    // Sunset
    var sunset = data.sys.sunset;
    sunset = new Date(sunset * 1000);
    sunset = sunset.toString();

    var sunsetH = sunset.slice(16, 18);
    var sunsetM = sunset.slice(19, 21);
    var sunsetS = sunset.slice(22, 24);
    sunsetH = parseInt(sunsetH);
    if (sunsetH >= 12) {
      sunsetH -= 12;
    }
    sunsetM = parseInt(sunsetM);
    sunsetS = parseInt(sunsetS);

    sunset = `${sunsetH}:${sunsetM}:${sunsetS} pm`;
    data.sys.sunset = sunset;

    this.setState({ weatherdata: this.state.weatherdata.concat(data) });

    console.log(this.state.weatherdata[this.state.weatherdata.length - 1]);
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Weather</h1>
          <GetZipcode getWeatherData={this.getWeatherData} />
          {this.state.weatherdata.map(zipcode => (
            <div key={zipcode.key}>
              <p>{zipcode.name}</p>
              <p>Temp: {Math.round(zipcode.main.temp)}&deg;F</p>
              <p>Feels Like: {Math.round(zipcode.main.feels_like)}&deg;F</p>
              <p>Pressure: {zipcode.main.pressure}</p>
              <p>Humidity: {zipcode.main.humidity}%</p>
              <p>Sky: {zipcode.weather[0].main}</p>
              <p>Description: {zipcode.weather[0].description}</p>
              <p>Wind Speed: {zipcode.wind.speed}</p>
              <p>Wind Deg: {zipcode.wind.deg}</p>
              <p>Wind Gusts: {zipcode.wind.gust}</p>
              <p>Sunrise: {zipcode.sys.sunrise}</p>
              <p>Sunset: {zipcode.sys.sunset}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
