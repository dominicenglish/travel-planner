import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';

import { setTitle } from '../../redux/actions/titleActions.js';
import { getTrips, createTrip } from '../../redux/actions/tripsActions.js';


class Trips extends Component {

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    router: React.PropTypes.object,
  };

  componentWillMount() {
    const { setTitle, getTrips } = this.props;
    setTitle('Trips');
    getTrips();
  }

  onAddTrip = (event) => {
    this.context.router.push('/trips/add');
  };

  render() {
    const tripTiles = this.props.trips ? this.props.trips.map(trip => (
      <GridTile key={trip.id} title={trip.title} subtitle={<span>{trip.locationCount || 0} locations</span>}><img className={styles.image} src={'/static/' + trip.image}/></GridTile>
    )) : [];
    return (
      <div className={styles.container}>
        <div className={styles.paper}>
          <GridList cellHeight={200}>
            {tripTiles}
          </GridList>
        </div>
        <FloatingActionButton className={styles.button} onMouseUp={this.onAddTrip} style={{
          position: 'absolute',
          right: 30,
          bottom: 30,
        }}><ContentAdd/></FloatingActionButton>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({title: state.title, trips: state.trips});
const mapDispatchToProps = { setTitle, getTrips, createTrip };

export default connect(mapStateToProps, mapDispatchToProps)(Trips);

const styles = cssInJS({
  paper: {
    padding: '20px 20px',
    overflowY: 'auto',
  },
  button: {
    position: 'absolute',
    right: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '48px 72px',
  },
  list: {
    flexBasis: '500px',
    backgroundColor: 'rgba(200, 200, 200, 1)',
    marginBottom: 24,
    overflowY: 'auto',
  },
  listItem: {
    padding: '10px 5px',
    borderTop: 'solid 1px #eee',
  },
  image: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
});
