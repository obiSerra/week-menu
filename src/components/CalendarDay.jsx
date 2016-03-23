// Import react components
import React from 'react';
import moment from 'moment';

class CalendarDayForm extends React.Component{
    constructor(props) {
        super(props);
        const { data = {lunch: null, dinner: null} } = props;
        this.state = { lunch: data.lunch.join(','), dinner: data.dinner.join(',') };
    }
    handleLunchChange (e) {
        this.setState({ lunch: e.target.value });
    }
    handleDinnerChange (e) {
        this.setState({ dinner: e.target.value });
    }
    render () {
        const { day, addDay, editDay } = this.props;

        const handleAddDay = (e) => {
            e.preventDefault();
            addDay(day.toObject(), this.state.lunch.split(','), this.state.dinner.split(','));
            editDay(null);
        };

        return (
            <form onSubmit={(e) => handleAddDay(e)}>
                <div className="form-group">
                    <label htmlFor="lunch">Lunch</label>
                    <input type="text" className="form-control" id="lunch"
                           placeholder="Enter all the dishes separated by commas"
                           value={this.state.lunch}
                           onChange={(e) => this.handleLunchChange(e)} />
                </div>

                <div className="form-group">
                    <label htmlFor="dinner">Dinner</label>
                    <input type="text" className="form-control" id="dinner"
                           placeholder="Enter all the dishes separated by commas"
                           value={this.state.dinner}
                           onChange={(e) => this.handleDinnerChange(e)} />
                </div>

                <button type="submit" className="btn btn-default">Save</button>
            </form>
        );
    }
};


const CalendarContent = (props) => {
    const { data } = props;

    if (!data || !_.has(data, 'lunch') || !_.has(data, 'dinner')) {
        return '';
    }
    return (
        <div>
            <div>{data.lunch.join(' -')}</div>
            <div>{data.dinner.join(' -')}</div>
            {props.children}
        </div>
    );
};

const CalendarDay = (props) => {
    const { day, editDay, editing, addDay, data } = props;

    const dayObj = moment(day);
    const editingObj = (_.isNull(editing)) ? null : moment(editing);

    const editCurrentDay = () => editDay(dayObj.toObject());
    const editBtn = (<a href="#" onClick={editCurrentDay}>Edit</a>);
    let displayContent = () => editBtn;

    if (editingObj && editingObj.diff(dayObj, 'days') === 0) {
        displayContent = () => (<CalendarDayForm addDay={addDay} day={day} editDay={editDay} data={data} />);
    } else if (data && _.has(data, 'lunch') && _.has(data, 'dinner')) {
        displayContent = () => (<CalendarContent data={data}> {editBtn} </CalendarContent>);
    }

    return (
        <div>
            <div className="day-title">
                <small>{day.format('MMM')}</small><br />
                <strong>{day.format('ddd D')}</strong> <br/>
                <br/>
                {displayContent()}
            </div>
        </div>
    );
};

export default CalendarDay;