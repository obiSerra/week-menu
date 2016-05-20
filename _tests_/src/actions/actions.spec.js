import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import * as actions from '../../../src/actions/actions.js';
import config from '../../../src/config/config.js';
import baseurl from '../../../src/config/baseurl.js';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('sync action creators', () => {
    it('should create an add day action', () => {
        expect(actions.addDay('dayfoo', 'lunchfoo', 'dinnerfoo')).toEqual({
            type: actions.ADD_DAY,
            day: 'dayfoo',
            lunch: 'lunchfoo',
            dinner: 'dinnerfoo'
        });
    });
    it('should create an edit day action', () => {
        expect(actions.editDay('dayfoo')).toEqual({
            type: actions.EDIT_DAY,
            day: 'dayfoo'
        });
    });
});

describe('async action creators', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe('fetch day list', () => {
        it('should dispatch a REQUEST_DAY_LIST e when called', (done) => {
            const store = mockStore({ dayList: [] });
            const expectedActions = [
                { type: actions.REQUEST_DAY_LIST },
                { type: actions.RECEIVE_DAY_LIST, dayList: ['foo'] }
            ];

            fetchMock
                .mock('https://shining-fire-9964.firebaseio.com/day-list.json', { dayList: 'foo' });

            return store.dispatch(actions.fetchDayList())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                });
        });
        it('should dispatch a ERROR_DAY_LIST on failed response', (done) => {
            const store = mockStore({ dayList: [] });
            const expectedActions = [
                { type: actions.REQUEST_DAY_LIST },
                { type: actions.ERROR_DAY_LIST }
            ];

            fetchMock
                .mock('https://shining-fire-9964.firebaseio.com/day-list.json', 500);

            return store.dispatch(actions.fetchDayList())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                });
        });
    });

    describe('save day', () => {
        it('should dispatch a REQUEST_DAY_LIST e when called', (done) => {
            const store = mockStore({ dayList: [] });
            const expectedActions = [
                { type: actions.REQUEST_DAY_LIST },
                { type: actions.RECEIVE_DAY_LIST, dayList: ['foo'] }
            ];

            fetchMock
                .mock('https://shining-fire-9964.firebaseio.com/day-list.json', { dayList: 'foo' });

            return store.dispatch(actions.fetchDayList())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                });
        });
        it('should dispatch a ERROR_DAY_LIST on failed response', (done) => {
            const store = mockStore({ dayList: [] });
            const expectedActions = [
                { type: actions.REQUEST_DAY_LIST },
                { type: actions.ERROR_DAY_LIST }
            ];

            fetchMock
                .mock('https://shining-fire-9964.firebaseio.com/day-list.json', 500);

            return store.dispatch(actions.fetchDayList())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                });
        });
    });
});