import config from '../config/config.js';
import _ from 'lodash';

export const ADD_DAY = 'ADD_DAY';
export const addDay = (day, lunch, dinner) => ({ type: ADD_DAY, day, lunch, dinner  });

export const EDIT_DAY = 'EDIT_DAY';
export const editDay = (day) => ({ type: EDIT_DAY, day});

export const REQUEST_DAY_LIST = 'REQUEST_DAY_LIST';
export const requestDayList = () => ({ type: REQUEST_DAY_LIST });

export const RECEIVE_DAY_LIST = 'RECEIVE_DAY_LIST';
export const receiveDayList = (dayList) => ({ type: RECEIVE_DAY_LIST, dayList });

export const ERROR_DAY_LIST = 'ERROR_DAY_LIST';
export const errorDayList = () => ({ type: ERROR_DAY_LIST });

const parseList = (listObj) => _.toArray(listObj);

export const fetchDayList = () => {
    return dispatch => {
        dispatch(requestDayList());

        fetch(config.dayListUrl())
            .then(response => response.text())
            .then(str => JSON.parse(str))
            .then(json => dispatch(receiveDayList(parseList(json))))
            .catch(error => dispatch(errorDayList()));
    }
};

export const SAVE_DAY = 'SAVE_DAY';
export const saveDay = (day, lunch, dinner) => ({ type: SAVE_DAY, day, lunch, dinner });

export const SAVED_DAY = 'SAVED_DAY';
export const savedDay = () => ({ type: SAVED_DAY });

export const ERROR_DAY = 'ERROR_DAY';
export const errorDay = (error) => ({ type: ERROR_DAY, error });

export const saveDateRemotely = (day, lunch, dinner) => {
    return dispatch => {
        dispatch(saveDay(day, lunch, dinner));
        fetch(config.dayUrl(day), {
            method: 'PUT',
            body: JSON.stringify({ day, lunch, dinner })
        }).then(response => {
            if (response.status === 200) {
                dispatch(savedDay());
            } else {
                dispatch(errorDay('No 200'))
            }
        }).catch(error => dispatch(errorDay(error)));
    }
};