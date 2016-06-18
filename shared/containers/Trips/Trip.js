import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import InfoIcon from 'material-ui/lib/svg-icons/action/info';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { connect } from 'react-redux';
import { push as pushHistory } from 'react-router-redux';

import { setMapCentre } from '../../redux/actions/mapActions.js';
import { getTrip } from '../../redux/actions/tripsActions.js';
import { getStops } from '../../redux/actions/stopsActions.js';
import { setTitle } from '../../redux/actions/titleActions.js';

// for Map
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import {default as FaSpinner} from 'react-icons/lib/fa/spinner';


class Trip extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentWillMount() {
    const { params: {tripId}, getTrip, getStops, setTitle } = this.props;
    getTrip(tripId);
    getStops(tripId);
  }

  componentWillUpdate() {
    const { setTitle, params: {tripId}, trips } = this.props;
    const trip = trips[tripId] || {};
    setTitle(trip.title);
  }

  onStopLinkClick = (coordinates, e) => {
    this.props.setMapCentre(coordinates.lat, coordinates.lng);
  };

  onStopInfoLinkClick = (tripId, stopId, coordinates, e) => {
    this.props.setMapCentre(coordinates.lat, coordinates.lng);
    this.context.router.push(`/trips/${tripId}/stops/${stopId}`);
  };

  onAddStopClick = (tripId, e) => {
    this.props.pushHistory(`/trips/${tripId}/stops/add`);
  };

  render() {
    const {
      children,
      map: {centre = {lat: -47.653078, lng: 168.373111}} = {},
      setMapCentre,
      trips,
      stops,
      params: {tripId}
    } = this.props;
    const trip = trips[tripId] || {};
    const stopOrder = trip.stops || [];
    const stopArray = stopOrder.reduce((prev, id) => {
      if (stops[id]) prev.push(stops[id]);
      return prev;
    }, []);
    const stopsList = stopOrder.map((stopId, index) => {
      const stop = stops[stopId] || {};
      return (
        <ListItem
          key={index}
          primaryText={stop.title}
          onClick={this.onStopLinkClick.bind(this, stop.coordinates)}
          rightIcon={
            <InfoIcon
              onClick={this.onStopInfoLinkClick.bind(this, trip.id, stop.id, stop.coordinates)
          }/>}
        />
      );
    });
    return (
      <div className={styles.container}>
        {children}
        <div className={styles.sidebar}>
          <List className={styles.stopList}>
            {stopsList}
          </List>
          <FloatingActionButton
            mini={true}
            style={extraStyles.fab}
            onTouchTap={this.onAddStopClick.bind(this, trip.id)}
            >
              <ContentAdd/>
          </FloatingActionButton>
        </div>
        <Map centreCoordinates={centre} stops={stopArray} setMapCentre={setMapCentre}></Map>
      </div>
    );
  }
}
const mapStateToProps = state => ({map: state.map, trips: state.trips, stops: state.stops});
const mapDispatchToProps = { setMapCentre, getTrip, getStops, setTitle, pushHistory };

export default connect(mapStateToProps, mapDispatchToProps)(Trip);






class Map extends Component {

  static propTypes = {
    centreCoordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    stops: PropTypes.array,
    setMapCentre: PropTypes.func,
  };

  componentDidUpdate() {
    // Centre the map to match props if the component updates
    this.centreGoogleMap(this.props.centreCoordinates);
  }

  // Interact with the maps API to pan the screen
  centreGoogleMap = (latLng) => {
    if (this._googleMapComponent) {
      this._googleMapComponent.panTo(latLng);
    }
  };

  // Tells redux where we would like to centre the map
  centreOnMarker = (e) => {
    if (e.latLng.lat() && e.latLng.lng()) {
      this.props.setMapCentre(e.latLng.lat(), e.latLng.lng());
    }
  };

  render() {
    const {centreCoordinates, stops = []} = this.props;
    const map = (
      <GoogleMap
        ref={map => this._googleMapComponent = map}
        defaultZoom={5}
        defaultCenter={centreCoordinates}
      >
        {stops.map((stop, index) => {
          if (stop.coordinates.lat && stop.coordinates.lng) {
            return (
              <Marker
                className={styles.map}
                position={stop.coordinates}
                key={index}
                defaultAnimation={2}
                onClick={this.centreOnMarker}
              />
            );
          }
        })}
      </GoogleMap>
    );

    return (
      <ScriptjsLoader
        hostname={"maps.googleapis.com"}
        pathname={"/maps/api/js"}
        query={{v: '3.24', libraries: 'geometry,drawing,places', key: 'AIzaSyBQucDLNsj5Ugh1ER0pCnLm6k2QX75TnCQ'}}
        loadingElement={
          <div>
            <FaSpinner />
          </div>
        }
        containerElement={<div className={styles.mapContainer} {...this.props}/>}
        googleMapElement={map}
      >
      </ScriptjsLoader>
    );
  };
}

const styles = cssInJS({
  container: {
    display: 'flex',
    flexGrow: '1',
  },
  sidebar: {
    position: 'relative',
    flexGrow: 1,
    maxWidth: 300,
  },
  stopList: {
    overflowY: 'auto',
  },
  mapContainer: {
    flexGrow: 1,
    minWidth: 500,
    minHeight: 500,
  },
  map: {
    flexGrow: 1,
    minWidth: 500,
    minHeight: 500,
    backgroundColor: '#ddd',
  },
});
const extraStyles = {
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
};
