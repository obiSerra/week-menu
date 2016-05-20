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
                .mock(config.dayListUrl(), { dayList: 'foo' });

            return store.dispatch(actions.fetchDayList())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    expect(fetchMock.called(config.dayListUrl())).toBe(true);
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
                .mock(config.dayListUrl(), 500);

            return store.dispatch(actions.fetchDayList())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                });
        });
    });

    describe('save day', () => {
        it('should dispatch a SAVE_DAY and a SAVED_DAY event when called', (done) => {
            const store = mockStore({});
            const expectedActions = [
                { type: actions.SAVE_DAY, day: { date: 'food', months: 'foom', years: 'fooy' }, lunch: 'foolunch', dinner: 'foodinner' },
                { type: actions.SAVED_DAY }
            ];

            return store.dispatch(actions.saveDateRemotely({ date: 'food', months: 'foom', years: 'fooy' }, 'foolunch', 'foodinner'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                });
        });
        it('should dispatch a SAVE_DAY and a SAVED_DAY event when called', (done) => {
            const url = `${baseurl}/day-list/food-foom-fooy.json`
            const store = mockStore({});
            fetchMock
                .mock(url, 200);

            return store.dispatch(actions.saveDateRemotely({ date: 'food', months: 'foom', years: 'fooy' }, 'foolunch', 'foodinner'))
                .then(() => {
                    expect(fetchMock.called(url)).toBe(true);
                    expect(JSON.parse(fetchMock.lastOptions(url).body)).toEqual({
                        day: { date: 'food', months: 'foom', years: 'fooy' },
                        lunch: 'foolunch',
                        dinner: 'foodinner'
                    });
                    done();
                });
        });

        it('should dispatch a ERROR_DAY on error response', (done) => {
            const url = `${baseurl}/day-list/food-foom-fooy.json`;
            const store = mockStore({});
            const expectedActions = [
                { type: actions.SAVE_DAY, day: { date: 'food', months: 'foom', years: 'fooy' }, lunch: 'foolunch', dinner: 'foodinner' },
                { type: actions.ERROR_DAY, error: { status: 500 } }
            ];

            fetchMock
                .mock(url, 500);

            return store.dispatch(actions.saveDateRemotely({ date: 'food', months: 'foom', years: 'fooy' }, 'foolunch', 'foodinner'))
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions);
                    done();
                });
        });
    });
});
