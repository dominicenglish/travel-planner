import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TRIPS_GET } from '../../redux/actions/tripsActions.js';
import defaultStyles from '../../styles/index.js';

class Trips extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({type: TRIPS_GET});
  }

  render() {
    const trips = this.props.trips ? this.props.trips.map(trip => (<li key={trip.id}>{trip.title}</li>)) : [];
    return (
      <div className={styles.list}>
        <h2> List of trips </h2>
        <ul className={styles.list}>
          {trips}
        </ul>
      </div>
    );
  }
}

export default connect(state => ({trips: state.trips}))(Trips);

const styles = cssInJS({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    // ...defaultStyles.list,
    flexBasis: '500px',
    backgroundColor: 'rgba(200, 200, 200, 1)',
  },
});
