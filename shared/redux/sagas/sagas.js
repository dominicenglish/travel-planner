import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { APIClient } from '../../../api/ApiClient.js';
import {
  TRIPS_GET,
  TRIPS_GET_SUCCESS,
  TRIPS_GET_FAIL
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

export function *watchTripsRequest() {
    yield *takeLatest(TRIPS_GET, getTrips);
}
