import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export class GetZipcode extends Component {
  state = {
    location: ''
  };

  static propTypes = {
    getWeatherDataProp: PropTypes.func.isRequired
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.location === '') {
      alert('Please enter a valid five digit zipcode.');
    } else {
      this.props.getWeatherDataProp(this.state.location);
      Cookies.set('zipcode', this.state.location, { expires: 365 });
      this.setState({ location: '' });
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <p className="mb-3 mt-3">Get the current weather by ZIP Code.</p>
          </div>
          <div className="col-md-6">
            <div className="input-group my-2">
              <input
                id="location"
                type="number"
                name="location"
                placeholder="ZIP Code"
                value={this.state.location}
                onChange={this.handleChange}
                className="form-control"
              />
              <input className="btn btn-info" type="submit" value="Submit" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
