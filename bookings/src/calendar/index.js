import React from 'react';
import moment from 'moment';
import './calendar.css';

export default class Calendar extends React.Component {
    state = {
        date: moment(),
        today: moment(),
        selectedDay: null
    }

    constructor(props) {
        super(props);
        this.width = props.width || "400px";
        this.style = props.style || {};
    }
render(){
    return (
        <div className="calendar-container">
            <h1>Calendar</h1>
        </div>
    )
}
}