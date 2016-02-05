import React, { Component } from 'react';
import { connect } from 'react-redux';

class Trips extends Component {
  render() {
    const trips = this.props.trips ? this.props.trips.map(trip => (<li>{trip.title}</li>)) : [];
    return (
      <div>
        <h2> List of trips </h2>
        <ul>
          <li> trip 1</li>
          {trips}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({trips: state.trips}))(Trips);
