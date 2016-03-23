// Import react components
import React from 'react';
import { ReactDOM } from 'react-dom';

import { connect } from 'react-redux';
// Import redux modules
import configureStore from '../store/configureStore';
import { bindActionCreators } from 'redux';

// Import actions
import * as Actions from '../actions/actions.js';

// Import JSX modules
import Title from '../components/Title.jsx';
import Calendar from '../components/Calendar.jsx';


let App = (props) => {
    const { dispatch, dayList, editing } = props;

    console.log(props);
    return (
        <div>
            <Title title="Week menu planning!" />
            <Calendar
                addDay={(day, lunch, dinner) => dispatch(Actions.addDay(day, lunch, dinner))}
                editDay={(day) => dispatch(Actions.editDay(day))}
                dayList={dayList}
                editing={editing}
            />
        </div>
    );
};

function initialState (state) {
    return state;
}

export default connect(initialState)(App);
