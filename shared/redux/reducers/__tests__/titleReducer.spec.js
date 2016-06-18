jest.unmock('../titleReducer.js');
jest.unmock('../../actions/titleActions.js');

import titleReducer from '../titleReducer.js';
import { TITLE_SET } from '../../actions/titleActions.js';

describe('titleReducer', () => {
  it('should return existing state if no cases match', () => {
    const state = 'hello';
    const action = {type: 'awelfkiasiodfja'};
    const newState = titleReducer(state, action);
    expect(newState).toBe(state);
  });

  describe('TITLE_SET', () => {
    it('should return action.title as new state', () => {
      const state = 'old';
      const action = {type: TITLE_SET, title: 'new'};
      const newState = titleReducer(state, action);
      expect(newState).toBe('new');
    });

    it('should return original state if action.title is undefined', () => {
      const state = 'old';
      const action = {type: TITLE_SET};
      const newState = titleReducer(state, action);
      expect(newState).toBe(state);
    });
  });
});
