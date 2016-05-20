import { combineReducers } from 'redux';

import dayList from './dayListReducer';
import editing from './editingReducer';

const rootReducer = combineReducers({
    dayList,
    editing
});

export default rootReducer;