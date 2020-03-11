import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      this.setState({ location: '' });
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>
            Zipcode
            <input
              type="number"
              name="location"
              placeholder="12345"
              value={this.state.location}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
        </div>
        <input className="btn btn-info" type="submit" value="Submit" />
      </form>
    );
  }
}
