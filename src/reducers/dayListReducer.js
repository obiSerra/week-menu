import _ from 'lodash';
import moment from 'moment';

import { ADD_DAY, RECEIVE_DAY_LIST } from '../actions/actions.js';

const dayList = (state = [], action = {}) => {
    switch (action.type) {
        case RECEIVE_DAY_LIST:
            return action.dayList;
        case ADD_DAY:
            const mDay = moment(action.day);

            return [
                {
                    day: action.day,
                    lunch: action.lunch,
                    dinner: action.dinner
                }
            ].concat(...state.filter((d) => moment(d.day).diff(mDay, 'days') !== 0)).sort((a, b) => (a.day > b.day) ? 1 : -1);
        default:
            return state;
    }
};

export default dayList;