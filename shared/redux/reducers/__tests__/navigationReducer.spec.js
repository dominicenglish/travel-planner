jest.unmock('../navigationReducer.js');
jest.unmock('../../actions/navigationActions.js');

import navigationReducer from '../navigationReducer.js';
import { NAVIGATION_STATE_SET } from '../../actions/navigationActions.js';

describe('navigationReducer', () => {
  it('should return existing state if no cases match', () => {
    const state = false;
    const action = {type: 'awelfkiasiodfja'};
    const newState = navigationReducer(state, action);
    expect(newState).toEqual(state);
  });

  describe('NAVIGATION_STATE_SET', () => {
    it('should set state to match action.isOpen', () => {
      const state = false;
      const action = {type: NAVIGATION_STATE_SET, isOpen: true};
      const newState = navigationReducer(state, action);
      expect(newState).toBe(true);
    });

    it('should return oldState if action.isOpen is undefined', () => {
      const state = false;
      const action = {type: NAVIGATION_STATE_SET};
      const newState = navigationReducer(state, action);
      expect(newState).toEqual(state);
    });
  });
});
