jest.unmock('../mapReducer.js');
jest.unmock('../../actions/mapActions.js');

import mapReducer from '../mapReducer.js';
import { MAP_CENTRE_SET } from '../../actions/mapActions.js';

describe('mapReducer', () => {
  it('should return existing state if no cases match', () => {
    const state = {};
    const action = {type: 'awelfkiasiodfja'};
    const newState = mapReducer(state, action);
    expect(newState).toEqual(state);
  });

  describe('MAP_CENTRE_SET', () => {
    it('should set the lat and lng of the centre property', () => {
      const state = {centre: {lat: 1, lng: 1}};
      const newCentre = {lat: 2, lng: 2};
      const action = {type: MAP_CENTRE_SET, lat: newCentre.lat, lng: newCentre.lng};
      const newState = mapReducer(state, action);
      expect(newState).toEqual({...state, centre: newCentre});
    });
  });
});
