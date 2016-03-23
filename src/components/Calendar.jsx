// Import react components
import React from 'react';
import moment from 'moment';

import CalendarDay from './CalendarDay.jsx';

const generateWeekList = (dayStart) => {
    const list = [];
    for(let i = 0; i < 7; i++) {
        list.push(moment(dayStart.format('YYYY-M-D'), 'YYYY-M-D').add(i, 'days'));
    }
    return list;
};

const generateDay = (day, editDay, editing, addDay) => (
    <li key={day.format('D')}>
        <CalendarDay addDay={addDay} editDay={editDay} day={day} editing={editing} />
    </li>
);

const Calendar = (props) => {
    const { dayList, addDay, editDay, editing } = props;

    const generateDayElement = (day) => generateDay(day, editDay, editing, addDay);

    const currentWeekStart = moment().startOf('week').subtract(1, 'day');
    const currentWeek = generateWeekList(currentWeekStart);
    const nextWeek = generateWeekList(currentWeekStart.add(1, 'week'));
    const currentWeekLI = currentWeek.map(generateDayElement);
    const nextWeekLI = nextWeek.map(generateDayElement);

    return (<div>
        <h3>Calendar</h3>

        <ul className="list-unstyled list-inline">
            {currentWeekLI}
        </ul>

        <ul className="list-unstyled list-inline">
            {nextWeekLI}
        </ul>
    </div>);
};

export default Calendar;