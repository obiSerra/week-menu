import editing from '../../../src/reducers/editingReducer.js';
import * as actions from '../../../src/actions/actions.js';

describe('Editing reducer', () => {
    it('should update the state on EDIT_DAY action', () => {
        expect(editing(null, { type: actions.EDIT_DAY, day: 'dayfoo' })).toBe('dayfoo');
    });

    it('should not update the state on other actions', () => {
        expect(editing('starting state', { type: 'whatever', day: 'dayfoo' })).toBe('starting state');
    });
});