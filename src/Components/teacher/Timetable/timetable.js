import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Calendar from 'react-calendar';
import Axios from 'axios';

class timetable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            curDate: '',
            minDate: ''
        };
        this.getDate = this.getDate.bind(this);
        // this.showCalendar = this.showCalendar.bind(this);
    }

    componentDidMount() {
        this.getDate();
    }

    getDate() {
        const tempDate = new Date();
        let month;
        if((tempDate.getMonth()+1) > '9') {
            month = tempDate.getMonth()+1;
        } else {
            let n = tempDate.getMonth()+1;
            month = '0' + n;
        }
        const minDate = tempDate.getFullYear() + '-' + month + '-' + tempDate.getDate();
        const date = tempDate.getDate() + '-' + month + '-' + tempDate.getFullYear();
        console.log(minDate);
        this.setState({
            curDate: date,
            minDate: minDate
        });
    }

    // showCalendar() {
    //     this.setState({
    //         show: !this.state.show
    //     });
    //     if(this.state.show)
    //         document.getElementById('calendar').hidden = false;
    //     else
    //         document.getElementById('calendar').hidden = true;
        
    // }

    addEvent() {
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const clas = document.getElementById('class').value;
        const time = document.getElementById('time').value;
        const details = document.getElementById('details').value;
        if(date && name) {
            const eventDetails = {name: name, date: date, class: clas, time: time, details: details};
            console.log('Event Details', eventDetails);
            Axios.post("http://localhost:5000/event/add", {data: eventDetails})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('reset').click();
                },
                err => {
                    console.log('Error');
                })
        } else {
            console.log('Error');
        }
    }

    render() {
        return(
            <Fragment>
                <Navbar token='event'/>
                <div className="container">
                    {/* <div className="d-flex justify-content-center"></div> */}
                    <p>Today's date: {this.state.curDate}</p>
                    {/* <button type="button" className="btn btn-dark m-2" onClick={this.showCalendar}>Calendar</button> */}
                    <div id="calendar">
                        <Calendar/>
                    </div>
                    <div className="jumbotron m-1">
                        <h5>Add new event:</h5>
                    </div>
                    <form>
                        <label>Event date:</label><br/>
                        <input type="date" id="date" min={this.state.minDate}/><br/>
                        <label>Class:</label><br/>
                        <select id="class">
                            <option value="All">All</option>
                            <option value="Nursery">Nursery</option>
                            <option value="KG">KG</option>
                            <option value="Transition">Transition</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select><br/>
                        <label>Event name:</label><br/>
                        <input type="text" id="name" size="10"/><br/>
                        <label>Event time:</label><br/>
                        <input type="time" id="time"/><br/>
                        <label>Event details:</label><br/>
                        <textarea id="details" cols="15"/><br/>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-dark m-2" onClick={this.addEvent}>Add</button>
                            <button type="reset" className="btn btn-dark m-2" id="reset">Reset</button>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default timetable;