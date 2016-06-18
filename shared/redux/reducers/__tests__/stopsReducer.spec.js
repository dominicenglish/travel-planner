jest.unmock('../stopsReducer.js');
jest.unmock('../../actions/stopsActions.js');

import stopsReducer from '../stopsReducer.js';
import {
  STOPS_GET_SUCCESS,
  STOPS_CREATE_SUCCESS,
  STOPS_UPDATE_SUCCESS,
  STOPS_DELETE_SUCCESS
} from '../../actions/stopsActions.js';

describe('stopsReducer', () => {
  it('should return existing state if no cases match', () => {
    const state = {};
    const action = {type: 'awelfkiasiodfja'};
    const newState = stopsReducer(state, action);
    expect(newState).toEqual(state);
  });

  describe('STOPS_GET_SUCCESS', () => {
    it('should add new stops', () => {
      const state = {1: {one: 'one'}};
      const newStops = {2: {two: 'two'}, 3: {three: 'three'}};
      const action = {type: STOPS_GET_SUCCESS, stops: newStops};
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(Object.assign({}, state, newStops));
    });

    it('should overwrite existing stops with new stops', () => {
      const state = {1: {one: 'one'}};
      const newStops = {1: {two: 'two'}};
      const action = {type: STOPS_GET_SUCCESS, stops: newStops};
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(newStops);
    });

    it('should return old state if action.stops is undefined', () => {
      const state = {1: {one: 'one'}};
      const newStops = undefined;
      const action = {type: STOPS_GET_SUCCESS, stops: newStops};
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(state);
    });
  });

  describe('STOPS_CREATE_SUCCESS', () => {
    it('should add the new stop', () => {
      const state = {1: {id: 1, one: 'one'}};
      const newStop = {id: 2, two: 'two'};
      const action = {type: STOPS_CREATE_SUCCESS, stop: newStop};
      const expectedStop = {};
      expectedStop[newStop.id] = newStop;
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(Object.assign({}, state, expectedStop));
    });

    it('should override an existing stop', () => {
      const state = {1: {id: 1, one: 'one'}};
      const newStop = {id: 1, two: 'two'};
      const action = {type: STOPS_CREATE_SUCCESS, stop: newStop};
      const expectedStop = {};
      expectedStop[newStop.id] = newStop;
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(expectedStop);
    });

    it('should return old state if action.stop is undefined', () => {
      const state = {1: {one: 'one'}};
      const newStop = undefined;
      const action = {type: STOPS_CREATE_SUCCESS, stop: newStop};
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(state);
    });
  });

  describe('STOPS_UPDATE_SUCCESS', () => {
    it('should update the existing stop', () => {
      const state = {1: {one: 'one'}};
      const newStop = {id: 1, two: 'two'};
      const action = {type: STOPS_UPDATE_SUCCESS, stop: newStop};
      const expectedStop = {};
      expectedStop[newStop.id] = newStop;
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(expectedStop);
    });

    it('should return old state if action.stop is undefined', () => {
      const state = {1: {one: 'one'}};
      const newStop = undefined;
      const action = {type: STOPS_UPDATE_SUCCESS, stop: newStop};
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(state);
    });
  });

  describe('STOPS_DELETE_SUCCESS', () => {
    it('should delete the specified stop', () => {
      const state = {1: {one: 'one'}};
      const id = 1;
      const action = {type: STOPS_DELETE_SUCCESS, id};
      const newState = stopsReducer(state, action);
      expect(newState).toEqual({});
    });

    it('should return old state if action.id is undefined', () => {
      const state = {1: {one: 'one'}};
      const id = undefined;
      const action = {type: STOPS_DELETE_SUCCESS, id};
      const newState = stopsReducer(state, action);
      expect(newState).toEqual(state);
    });
  });

});
