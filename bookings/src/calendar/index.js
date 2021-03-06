import React from 'react';
import moment from 'moment';
import './calendar.css';

export default class Calendar extends React.Component {
    state = {
        date: moment(),
        today: moment(),
        selectedDay: [],
    }

    constructor(props) {
        super(props);
        this.width = props.width || "800px";
        this.style = props.style || {};
        this.style.width = this.width;
    }

    weekdays = moment.weekdaysShort();
    months = moment.months();

//get dates in various formats
    year = () => {
        return this.state.date.format("Y");
    }
    month = () => {
        return this.state.date.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.date.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.date.get("date"));
        return this.state.date.get("date");
    }
    currentDay = () => {
        return this.state.date.format("D");
    }

    firstDayOfMonth = () => {
        let date = this.state.date;
        let firstDay = moment(date).startOf('month').format('d'); // Day of week 0-6 of first day
        return firstDay;
    }

    setMonth = (month) => {
      let monthNo = this.months.indexOf(month);
        let date = Object.assign({}, this.state.date);
        date = moment(date).set("month", monthNo);
        this.setState({
            date: date
        });
    }

    nextMonth = () => {
        let date = Object.assign({}, this.state.date);
        date = moment(date).add(1, "month");
        this.setState({
            date: date
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let date = Object.assign({}, this.state.date);
        date = moment(date).subtract(1, "month");
        this.setState({
            date: date
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }


    MonthLabel = () => {
        return (
            <span className="label-month">
                {this.month()}
            </span>
        );
    }

    YearLabel = () => {
        return (
            <span className="label-year">
             {this.year()}
           </span>
        );
    }

    onDayClick = (e, day) => {
            //if it's in the array
            if(this.state.selectedDay.indexOf(day)>-1){
                //remove 1 element from the index of day
                this.setState({
                    selectedDay: this.state.selectedDay.splice(this.state.selectedDay.indexOf(day),1)
                }); 
            }
            //if not in array, and not sunday
            else if(moment.weekdaysShort(day)!== 'Sun')/*day is not sunday)*/{
                //add to array
                this.setState({
                    selectedDay: this.state.selectedDay.concat([day])
                });
            }
        

        this.props.onDayClick && this.props.onDayClick(e, day);
    }
    
render(){
    let weekdays = this.weekdays.map((day) => {
        return (
            <td key={day} className="week-day">{day}</td>
        )
    });
    //first day of the month offset
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
        blanks.push(<td key={i * 1} className="emptySlot">
            {""}
            </td>
        );
    }
//print the blanks
    console.log("blanks: ", blanks);
//days in the month array
    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
        let className = (d === this.currentDay() ? "day current-day": "day");
        let selectedClass = (d === this.state.selectedDay ? " selected-day " : "")
        daysInMonth.push(
            <td key={d} className={className + selectedClass} >
                <span onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
            </td>
        );
    }

//print the days
    console.log("days: ", daysInMonth);
//... is all -->all blanks, all daysIM combined in one array
    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];
//7 days in the week, new row when divisible by 7
    totalSlots.forEach((row, i) => {
        if ((i % 7) !== 0) {
            cells.push(row);
        } else {
            let insertRow = cells.slice();
            rows.push(insertRow);
            cells = [];
            cells.push(row);
        }//end of days of month row
        if (i === totalSlots.length - 1) {
            let insertRow = cells.slice();
            rows.push(insertRow);
        }
    });
//make all the day rows in the table
    let trDayBoxes = rows.map((d, i) => {
        return (
            <tr key={i*2}>
                {d}
            </tr>
        );
    })
    return (
        <div className="calendar-container" style={this.style}>
         <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                        <td colSpan="2">
                                <this.MonthLabel />
                                {" "}
                                <this.YearLabel />
                            </td>
                            <td colSpan="2" className="chevronMonthChange">
                                <i className="prev fa fa-fw fa-chevron-left"//font not working TODO
                                    onClick={(e)=> {this.prevMonth()}}>
                                </i>
                                <i className="prev fa fa-fw fa-chevron-right"
                                    onClick={(e)=> {this.nextMonth()}}>
                                </i>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {weekdays}
                        </tr>
                        {trDayBoxes}
                    </tbody>
                </table>
        </div>
    )
}
}