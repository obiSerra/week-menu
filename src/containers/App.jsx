// Import react components
import React from 'react';
import { ReactDOM } from 'react-dom';

import { connect } from 'react-redux';
// Import redux modules
import configureStore from '../store/configureStore';
import { bindActionCreators } from 'redux';

// Import actions
import { addDay, editDay, saveDateRemotely, fetchDayList } from '../actions/actions.js';

// Import JSX modules
import Title from '../components/Title.jsx';
import Calendar from '../components/Calendar.jsx';

class App extends React.Component {
    componentDidMount () {
        const { dispatch } = this.props;

        dispatch(fetchDayList());
    }
    render () {
        const { dispatch, dayList, editing } = this.props;

        const saveDay = (day, lunch, dinner) => {
            dispatch(saveDateRemotely(day, lunch, dinner));
            dispatch(addDay(day, lunch, dinner));
        };

        return (
            <div>
                <Title title="Week menu planning!" />
                <Calendar
                    addDay={(day, lunch, dinner) => saveDay(day, lunch, dinner)}
                    editDay={(day) => dispatch(editDay(day))}
                    dayList={dayList}
                    editing={editing}
                />
            </div>
        );
    }
};

function initialState (state) {
    return state;
}

export default connect(initialState)(App);
