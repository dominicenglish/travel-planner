import { takeEvery, takeLatest } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import APIClient from '../../../api/ApiClient.js';
import {
  TRIPS_GET,
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL,
  TRIPS_CREATE,
  TRIPS_CREATE_SUCCESS,
  TRIPS_CREATE_FAIL,
  TRIP_GET,
  TRIP_GET_SUCCESS,
  TRIP_GET_FAIL,
} from '../actions/tripsActions.js';

import {
  STOPS_GET,
  STOPS_GET_SUCCESS,
  STOPS_GET_FAIL,
  STOPS_CREATE,
  STOPS_CREATE_SUCCESS,
  STOPS_CREATE_FAIL,
  STOPS_UPDATE,
  STOPS_UPDATE_SUCCESS,
  STOPS_UPDATE_FAIL,
  STOPS_DELETE,
  STOPS_DELETE_SUCCESS,
  STOPS_DELETE_FAIL
} from '../actions/tripsActions.js';

const api = new APIClient();

export function *getTrips(action={}) {
  try {
    const trips = yield call(api.get, '/trips');
    yield put({type: TRIPS_GET_SUCCESS, trips})
  } catch (error) {
    yield put({type: TRIPS_GET_FAIL, error});
  }
}

export function *createTrip(action={}) {
  const {
    departureDate,
    returnDate,
    title,
    description,
    image,
    users = []
  } = action;
  try {
    const trip = yield call(api.put, '/trips', {
      params: {
        departureDate,
        returnDate,
        title,
        description,
        image,
        users
      }
    });
    yield put({type: TRIPS_CREATE_SUCCESS, trip});
  } catch (error) {
    yield put({type: TRIPS_CREATE_FAIL, error});
  }
}

export function *getTrip(action={}) {
  const { tripId } = action;
  try {
    const trip = yield call(api.get, `/trips/${tripId}`);
    yield put({type: TRIP_GET_SUCCESS, trip});
  } catch (error) {
    yield put({type: TRIP_GET_FAIL, error});
  }
}

export function *getStops(action={}) {
  const { tripId } = action;
  try {
    const stops = yield call(api.get, `/stops`, {params: {tripId}});
    yield put({type: STOPS_GET_SUCCESS, stops});
  } catch (error) {
    yield put({type: STOPS_GET_FAIL, error});
  }
}

export function *createStop(action={}) {
  const { tripId, title, description, address, images=[], coordinates={} } = action;
  try {
    const stop = yield call(api.put, `/stops`, {
      params: {
        tripId,
        title,
        description,
        address,
        images,
        coordinates,
      }
    });
    yield put({type: STOPS_CREATE_SUCCESS, stop});
  } catch (error) {
    yield put({type: STOPS_CREATE_FAIL, error});
  }
}

export function *updateStop(action={}) {
  const { stopId, tripId, title, description, address, images=[], coordinates={} } = action;
  try {
    const stop = yield call(api.post, `/stops/${stopId}`, {
      params: {
        tripId,
        title,
        description,
        address,
        images,
        coordinates,
      }
    });
    yield put({type: STOPS_UPDATE_SUCCESS, stop});
  } catch (error) {
    yield put({type: STOPS_UPDATE_FAIL, error});
  }
}

export function *deleteStop(action={}) {
  const { stopId } = action;
  try {
    const stop = yield call(api.delete, `/stops/${stopId}`);
    yield put({type: STOPS_DELETE_SUCCESS, stop});
  } catch (error) {
    yield put({type: STOPS_DELETE_FAIL, error});
  }
}

function *watchTripsRequest() {
    yield *takeLatest(TRIPS_GET, getTrips);
}

function *watchCreateTrip() {
  yield *takeLatest(TRIPS_CREATE, createTrip);
}

function *watchGetTrip() {
  yield *takeLatest(TRIP_GET, getTrip);
}

function *watchGetStops() {
  yield *takeLatest(STOPS_GET, getStops);
}

function *watchCreateStop() {
  yield *takeLatest(STOPS_CREATE, createStop);
}

function *watchUpdateStop() {
  yield *takeLatest(STOPS_UPDATE, updateStop);
}

function *watchDeleteStop() {
  yield *takeLatest(STOPS_DELETE, deleteStop);
}

export default function *root() {
  yield [
    fork(watchTripsRequest),
    fork(watchCreateTrip),
    fork(watchGetStops),
    fork(watchCreateStop),
    fork(watchUpdateStop),
    fork(watchDeleteStop),
  ]
}
