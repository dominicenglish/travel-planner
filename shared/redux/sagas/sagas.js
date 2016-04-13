import { takeEvery, takeLatest } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import { APIClient } from '../../../api/ApiClient.js';
import {
  TRIPS_GET,
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL,
  TRIPS_CREATE,
  TRIPS_CREATE_SUCCESS,
  TRIPS_CREATE_FAIL,
} from '../actions/tripsActions.js';

const api = new APIClient();

export function *getTrips() {
  try {
    const trips = yield api.get('/trips');
    yield put({type: TRIPS_GET_SUCCESS, trips})
  } catch (error) {
    yield put({type: TRIPS_GET_FAIL, error});
  }
}

function *addTrip() {
  try {
    const trip = yield call(api.put, '/trips', {params: 'test'});
    yield put({type: TRIPS_CREATE_SUCCESS, trip});
  } catch (error) {
    yield put({type: TRIPS_CREATE_FAIL, error});
  }
}

function *watchTripsRequest() {
    yield *takeLatest(TRIPS_GET, getTrips);
}

function *watchAddTrip() {
  yield *takeLatest(TRIPS_CREATE, addTrip);
}

export default function *root() {
  yield [
    fork(watchTripsRequest),
    fork(watchAddTrip),
  ]
}
