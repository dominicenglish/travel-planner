import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import { getTrip } from '../../redux/actions/tripsActions.js';

class Stop extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { params: {tripId}, getTrip } = this.props;
    getTrip(tripId);
  }

  handleClose = () => {
    const { params: {tripId} } = this.props;
    this.context.router.push(`/trips/${tripId}`);
  };

  render() {
    const { params: {tripId}, trips = []} = this.props;
    const trip = trips.find((trip) => {
      return trip.id == tripId;
    });
    const { title='', address='', description='', image=''} = trip || {};
    return (
      <Dialog
        open={true}
        onRequestClose={this.handleClose}
        modal={false}
        bodyStyle={{padding: 0}}
        >
        <Card>
          <CardMedia
            overlay={<CardTitle title={title} subtitle={address} />}>
            <img src={'/static/'+image} />
          </CardMedia>
          <CardText>
            <p>{address}</p>
            <p>{description}</p>
          </CardText>
        </Card>

      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.trips,
});

const mapDispatchToProps = { getTrip };

export default connect(mapStateToProps, mapDispatchToProps)(Stop);
