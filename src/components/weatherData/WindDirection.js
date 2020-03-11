import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class GetWindDirection extends Component {
  state = {
    direction: ''
  };

  static propTypes = {
    getWindDirection: PropTypes.number.isRequired
  };

  formatWindDirection = () => {
    var dir = this.props.getWindDirection;
    var dirStr = '';

    if (dir >= 348.75 || dir <= 11.25) {
      dirStr = 'N';
    } else if (dir <= 33.75) {
      dirStr = 'NNE';
    } else if (dir <= 56.25) {
      dirStr = 'NE';
    } else if (dir <= 78.75) {
      dirStr = 'ENE';
    } else if (dir <= 101.25) {
      dirStr = 'E';
    } else if (dir <= 123.75) {
      dirStr = 'ESE';
    } else if (dir <= 146.25) {
      dirStr = 'SE';
    } else if (dir <= 168.75) {
      dirStr = 'SSE';
    } else if (dir <= 191.25) {
      dirStr = 'S';
    } else if (dir <= 213.75) {
      dirStr = 'SSW';
    } else if (dir <= 236.25) {
      dirStr = 'SW';
    } else if (dir <= 258.75) {
      dirStr = 'WSW';
    } else if (dir <= 281.25) {
      dirStr = 'W';
    } else if (dir <= 303.75) {
      dirStr = 'WNW';
    } else if (dir <= 326.25) {
      dirStr = 'NW';
    } else if (dir <= 348.75) {
      dirStr = 'NNW';
    }

    this.setState({ direction: dirStr });
  };

  componentDidMount() {
    this.formatWindDirection();
  }

  render() {
    return <p>Wind Direction: {this.state.direction}</p>;
  }
}
