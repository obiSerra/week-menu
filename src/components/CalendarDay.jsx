// Import react components
import React from 'react';
import moment from 'moment';

class CalendarDayForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = { lunch: "", dinner: "" };
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
            addDay(day.toObject(), this.state.lunch, this.state.dinner);
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


const CalendarDay = (props) => {
    const { day, editDay, editing, addDay } = props;

    const dayObj = moment(day);
    const editingObj = (_.isNull(editing)) ? null : moment(editing);

    const editCurrentDay = () => editDay(dayObj.toObject());

    let displayContent = () => (<a href="#" onClick={editCurrentDay}>Edit</a>);

    if (editingObj && editingObj.diff(dayObj, 'days') === 0) {
        displayContent = () => (<CalendarDayForm addDay={addDay} day={day} editDay={editDay} />);
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