/*import React from 'react';
//import moment from 'moment';
//import './calendar.css';

//export default class Calendar extends React.Component {
    //state = {
        date: moment(),
        today: moment(),
        selectedDay: null
    }

    //constructor(props) {
        super(props);
        this.width = props.width || "400px";
        this.style = props.style || {};
        this.style.width = this.width; // add this
    }


    //weekdays = moment.weekdays();
   // months = moment.months();

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
        let firstDay = moment(date).startOf('month').format('d'); // Day of week 0....6
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

    onSelectChange = (e, data) => {
       // this.setMonth(data);//TODO
        this.props.onMonthChange && this.props.onMonthChange();

    }
    //SelectList = (props) => {
      //  let popup = props.data.map((data) => {
        //    return (
          //      <div key={data}>
            //        <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
              //          {data}
                //    </a>
                //</div>
            //);
        //});

//        return (
 //         /  <div className="month-popup">
   //             {popup}
     //       </div>
      //  );
    //}

    onChangeMonth = (e, month) => {
       this.setState({
            showMonthPopup: !this.state.showMonthPopup//TODO
        });
    }

  MonthNav = () => {
    return (
        <span className="label-month"
            onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
            {this.month()}
        </span>
    );
}

    //showYearEditor = () => {
       // this.setState({
       //     showYearNav: true
      //  });
  //  }//TODO

   // setYear = (year) => {
    //    let date = Object.assign({}, this.state.date);
    //    date = moment(date).set("year", year);
     //   this.setState({
    //        date: date
     //   })
    }
    //onYearChange = (e) => {
    //    this.setYear(e.target.value);
    //    this.props.onYearChange && this.props.onYearChange(e, e.target.value);
   // }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                defaultValue = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"/>
            :
            <span className="label-year">
             {this.year()}
           </span>
        );
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
    }

    render() {
        // Map the weekdays i.e Sun, Mon, Tue etc as <td>
        let weekdays = this.weekdays.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }

        console.log("blanks: ", blanks);

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "day current-day": "day");
            let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
            daysInMonth.push(
                <td key={d} className={className + selectedClass} >
                    <span onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
                </td>
            );
        }


        console.log("days: ", daysInMonth);

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*100}>
                    {d}
                </tr>
            );
        })

        return (
            <div className="calendar-container" style={this.style}>
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="5">
                                <this.MonthNav />
                                {" "}
                                <this.YearNav />
                            </td>
                            <td colSpan="2" className="nav-month">
                                <i className="prev fa fa-fw fa-chevron-left"
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
                        {trElems}
                    </tbody>
                </table>

            </div>

        );
    }
}