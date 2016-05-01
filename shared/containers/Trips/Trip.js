import React, { Component } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { connect } from 'react-redux';

import { setMapCentre } from '../../redux/actions/mapActions.js';

// for Map
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import {default as FaSpinner} from 'react-icons/lib/fa/spinner';


class Trip extends Component {
  render() {
    const trips = [
      {name: 'woo', description: 'description', coordinates: {lat: -38.353078, lng: 174.374111}},
      {name: 'woo', description: 'description', coordinates: {lat: -39.653078, lng: 175.375111}},
      {name: 'woo', description: 'description', coordinates: {lat: -38.653078, lng: 174.381111}},
      {name: 'woo', description: 'description', coordinates: {lat: -37.653078, lng: 173.382111}},
      {name: 'woo', description: 'description', coordinates: {lat: -37.253078, lng: 173.383111}},
      {name: 'woo', description: 'description', coordinates: {lat: -36.653078, lng: 172.384111}},
      {name: 'wee', description: 'description', coordinates: {lat: -41.653078, lng: 173.376111}},
      {name: 'woo', description: 'description', coordinates: {lat: -42.663078, lng: 173.377111}},
      {name: 'woo', description: 'description', coordinates: {lat: -43.673078, lng: 172.378111}},
      {name: 'woo', description: 'description', coordinates: {lat: -44.653078, lng: 171.379111}},
      {name: 'woo', description: 'description', coordinates: {lat: -45.653078, lng: 170.371111}},
      {name: 'woo', description: 'description', coordinates: {lat: -46.653078, lng: 169.372111}},
      {name: 'woo', description: 'description', coordinates: {lat: -47.653078, lng: 168.373111}},
    ];
    const {
      children,
      map: {centre = {lat: -47.653078, lng: 168.373111}} = {},
      setMapCentre,
    } = this.props;
    const destinations = trips.map((trip, index) => {
      return (<ListItem key={index} primaryText={trip.name} />);
    });
    return (
      <div className={styles.container}>
        {children}
        <List className={styles.destinationList}>{destinations}</List>
        <Map centreCoordinates={centre} trips={trips} setMapCentre={setMapCentre}></Map>
      </div>
    );
  }
}
const mapStateToProps = state => ({map: state.map});
const mapDispatchToProps = { setMapCentre };

export default connect(mapStateToProps, mapDispatchToProps)(Trip);

class Map extends Component {

  centreMap = (latLng) => {
    this.props.setMapCentre(-47.653078, 172.378111);
    this._googleMapComponent.panTo(latLng);
  };

  centreOnMarker = (e) => {
    this.centreMap(e.latLng);
  };

  render() {
    const {centreCoordinates, trips = [], setMapCentre} = this.props;
    const map = (
      <GoogleMap
        ref={map => {this._googleMapComponent = map; console.log(this);}}
        defaultZoom={5}
        defaultCenter={centreCoordinates}
      >
        {trips.map((trip, index) => {
            return (
              <Marker
                className={styles.map}
                position={trip.coordinates}
                key={index}
                defaultAnimation={2}
                onClick={this.centreOnMarker}
              />
            );
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
  },
  destinationList: {
    flexGrow: 1,
    maxWidth: 300,
    overflowY: 'auto',
  },
  mapContainer: {
    flexGrow: 1,
    minWidth: 500,
    minHeight: 300,
  },
  map: {
    flexGrow: 1,
    minWidth: 500,
    minHeight: 300,
    backgroundColor: '#ddd',
  }
});
