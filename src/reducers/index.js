import { combineReducers } from 'redux';
import _ from 'lodash';

import { ADD_DAY, EDIT_DAY } from '../actions/actions.js';

const dayList = (state = [], action = {}) => {
    switch (action.type) {
        case ADD_DAY:
            return [
                {
                    day: action.day,
                    lunch: action.lunch,
                    dinner: action.dinner
                },
                ...state
            ];
        default:
            return state;
    }
};

const editing = (state = null, action = {}) => {

    switch (action.type) {
        case EDIT_DAY:
            return action.day;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dayList,
    editing
});

export default rootReducer;