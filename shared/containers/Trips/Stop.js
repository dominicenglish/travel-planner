import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/lib/dialog';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import { getStops } from '../../redux/actions/stopsActions.js';
import StopInfo from '../../components/Stops/StopInfo.js';

class Stop extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { params: {tripId}, getStops } = this.props;
    getStops(tripId);
  }

  handleClose = () => {
    const { params: {tripId} } = this.props;
    this.context.router.push(`/trips/${tripId}`);
  };

  render() {
    const { params: {stopId}, stops = {}} = this.props;
    const stop = stops[stopId];
    const { title='', description='', address='', images=[], details=[] } = stop || {};
    const image = images[0];
    return (
      <Dialog
        open={true}
        onRequestClose={this.handleClose}
        modal={false}
        bodyStyle={{padding: 0}}
        autoScrollBodyContent={true}
        >
        <Card>
          <CardMedia
            style={{maxHeight: 300, minHeight: 200, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            overlay={<CardTitle title={title} />}>
            <img src={'/static/'+image} style={{objectFit: 'cover'}}/>
          </CardMedia>
          <CardText>
            <p>{description}</p>
            <StopInfo address={address} details={details}></StopInfo>
          </CardText>
        </Card>

      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  stops: state.stops,
});

const mapDispatchToProps = { getStops };

export default connect(mapStateToProps, mapDispatchToProps)(Stop);
