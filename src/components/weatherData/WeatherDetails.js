import React, { Component } from 'react';
import { GetWindDirection } from './WindDirection';
import { GetZipcode } from '../locations/GetZipcode';
import axios from 'axios';

export class WeatherDetails extends Component {
  state = {
    location: null,
    weatherdata: []
  };

  capitalize = s =>
    s
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

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

  componentDidMount() {
    this.getWeatherData(60601);
  }

  render() {
    return (
      <div>
        <GetZipcode getWeatherDataProp={this.getWeatherData} />
        {this.state.weatherdata.map(zipcode => (
          <div className="card p-4 my-3" key={zipcode.key}>
            <div>
              <h4>{zipcode.name}</h4>
              <p>{this.capitalize(zipcode.weather[0].description)}</p>
            </div>
            <div className="text-end">
              <div className="d-flex justify-content-center">
                <img
                  src={`http://openweathermap.org/img/wn/${zipcode.weather[0].icon}@4x.png`}
                  alt={zipcode.weather[0].description}
                />
                <div className="pe-5">
                  <h2 className="display-1">
                    {Math.round(zipcode.main.temp)}&deg;F
                  </h2>
                  <p>Feels Like: {Math.round(zipcode.main.feels_like)}&deg;F</p>
                  <p>Humidity: {zipcode.main.humidity}%</p>
                </div>
              </div>
            </div>

            <div className="row border-top border-3 mx-3 pt-3 text-center">
              <div className="col-sm-6">
                <p>Cloud Cover: {zipcode.clouds.all}%</p>
                <p>
                  Wind: <GetWindDirection getWindDirection={zipcode.wind.deg} />{' '}
                  {zipcode.wind.speed === undefined
                    ? 0
                    : `${zipcode.wind.speed} mph`}
                </p>
                <p>
                  Wind Gusts:{' '}
                  {zipcode.wind.gust === undefined
                    ? 0
                    : `${zipcode.wind.gust} mph`}
                </p>
              </div>
              <div className="col-sm-6">
                <p>Sunrise: {zipcode.sys.sunrise}</p>
                <p>Sunset: {zipcode.sys.sunset}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WeatherDetails;
