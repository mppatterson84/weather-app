import React, { Component } from 'react';
import { GetWindDirection } from './WindDirection';
import { GetZipcode } from '../locations/GetZipcode';
import axios from 'axios';

export class WeatherDetails extends Component {
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

    // Convert unix time to readable time
    const timeConvert = timeInput => {
      timeInput = new Date(timeInput * 1000);
      timeInput = timeInput.toString();

      var strArr = timeInput.split(' ');
      var timeStr = strArr[4];
      var timeArr = timeStr.split(':');
      var amOrPm = '';

      timeArr[0] = parseInt(timeArr[0]);
      if (timeArr[0] < 12) {
        amOrPm = 'am';
      } else {
        timeArr[0] -= 12;
        amOrPm = 'pm';
      }

      timeArr[0] = String(timeArr[0]);

      var newTime = `${timeArr[0]}:${timeArr[1]}:${timeArr[2]} ${amOrPm}`;

      return newTime;
    };

    // Sunrise
    data.sys.sunrise = timeConvert(data.sys.sunrise);

    // Sunset
    data.sys.sunset = timeConvert(data.sys.sunset);

    this.setState({ weatherdata: this.state.weatherdata.concat(data) });

    console.log(this.state.weatherdata[this.state.weatherdata.length - 1]);
  };

  render() {
    return (
      <div>
        <GetZipcode getWeatherDataProp={this.getWeatherData} />
        {this.state.weatherdata.map(zipcode => (
          <div key={zipcode.key}>
            <p>{zipcode.name}</p>
            <p>Temp: {Math.round(zipcode.main.temp)}&deg;F</p>
            <p>Feels Like: {Math.round(zipcode.main.feels_like)}&deg;F</p>
            <p>Pressure: {zipcode.main.pressure}</p>
            <p>Humidity: {zipcode.main.humidity}%</p>
            <p>Sky: {zipcode.weather[0].main}</p>
            <p>Description: {zipcode.weather[0].description}</p>
            <p>
              Wind Speed:{' '}
              {zipcode.wind.speed === undefined
                ? 0
                : `${zipcode.wind.speed} mph`}
            </p>
            <GetWindDirection getWindDirection={zipcode.wind.deg} />
            <p>
              Wind Gusts:{' '}
              {zipcode.wind.gust === undefined ? 0 : `${zipcode.wind.gust} mph`}
            </p>
            <p>Sunrise: {zipcode.sys.sunrise}</p>
            <p>Sunset: {zipcode.sys.sunset}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default WeatherDetails;
