import dayList from '../../../src/reducers/dayListReducer.js';
import * as actions from '../../../src/actions/actions.js';

describe('day list reducer', () => {
    it('should return the list on RECEIVE_DAY_LIST action', () => {
        const action = actions.receiveDayList(['a', 'b', 'c']);
        expect(dayList(undefined, action)).toEqual(['a', 'b', 'c']);
    });

    it('should add an element to the list on ADD_DAY action in the right order', () => {
        const startingList = [
            {
                day: +new Date('June 10, 1983'),
                lunch: 'foofoofoo',
                dinner: 'barbarbar'
            },
            {
                day: +new Date('December 16, 2013'),
                lunch: 'foo',
                dinner: 'bar'
            }
        ];
        const action = actions.addDay(+new Date('January 29, 1985'), 'foofoo', 'barbar');
        const newState = dayList(startingList, action);
        expect(newState).toEqual([{
            day: +new Date('June 10, 1983'),
            lunch: 'foofoofoo',
            dinner: 'barbarbar'
        },{
            day: +new Date('January 29, 1985'),
            lunch: 'foofoo',
            dinner: 'barbar'
        },
        {
            day: +new Date('December 16, 2013'),
            lunch: 'foo',
            dinner: 'bar'
        }
        ]);
    });

    it('should not add the same day twice, but replace it', () => {
        const startingList = [
            {
                day: +new Date('January 29 1985'),
                lunch: 'foofoofoo',
                dinner: 'barbarbar'
            },
            {
                day: +new Date('December 16, 2013'),
                lunch: 'foo',
                dinner: 'bar'
            }
        ];
        const action = actions.addDay(+new Date('January 29, 1985'), 'foofoo', 'barbar');
        const newState = dayList(startingList, action);
        expect(newState).toEqual([{
            day: +new Date('January 29, 1985'),
            lunch: 'foofoo',
            dinner: 'barbar'
        },
        {
            day: +new Date('December 16, 2013'),
            lunch: 'foo',
            dinner: 'bar'
        }
        ]);
    });
});