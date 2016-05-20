import { EDIT_DAY } from '../actions/actions.js';

const editing = (state = null, action = {}) => {
    switch (action.type) {
        case EDIT_DAY:
            return action.day;
        default:
            return state;
    }
};

export default editing;