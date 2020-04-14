import React, { Fragment } from 'react';
import './navbar.css';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
          token: nextProps.token
        });
    }

    componentDidUpdate() {
        console.log(this.state.token);
        if(this.state.token === 'event') {
            document.getElementById('eventrecordnav').hidden = false;
            document.getElementById('eventrecord').hidden = true;
        }
        if(this.state.token === 'eventrecord') {
            document.getElementById('eventrecordnav').hidden = true;
            document.getElementById('eventrecord').hidden = false;
        }
        if(this.state.token === 'syllabus') {
            document.getElementById('syllabusrecordnav').hidden = false;
            document.getElementById('syllabusrecord').hidden = true;
        }
        if(this.state.token === 'syllabusrecord') {
            document.getElementById('syllabusrecordnav').hidden = true;
            document.getElementById('syllabusrecord').hidden = false;
        }
        if(this.state.token === 'homework') {
            document.getElementById('homeworkrecordnav').hidden = false;
            document.getElementById('homeworkrecord').hidden = true;
        }
        if(this.state.token === 'homeworkrecord') {
            document.getElementById('homeworkrecordnav').hidden = true;
            document.getElementById('homeworkrecord').hidden = false;
        }
        if(this.state.token === 'announcement') {
            document.getElementById('announcementrecordnav').hidden = false;
            document.getElementById('announcementrecord').hidden = true;
        }
        if(this.state.token === 'announcementrecord') {
            document.getElementById('announcementrecordnav').hidden = true;
            document.getElementById('announcementrecord').hidden = false;
        }
    }

    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-dark navbar-inverse bg-dark">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to='/'><button type="button" className="btn btn-outline-warning navbut">Home</button></Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            <Link to='/timetablerecord'><button type="button" id="eventrecordnav" className="btn btn-outline-warning record navbut" hidden>Events</button></Link>
                        </li>
                        <li>
                            <Link to='/timetable'><button type="button" id="eventrecord" className="btn btn-outline-warning record navbut" hidden>Back</button></Link>
                        </li>
                        <li>
                            <Link to='/syllabusrecord'><button type="button" id="syllabusrecordnav" className="btn btn-outline-warning record navbut" hidden>Syllabus</button></Link>
                        </li>
                        <li>
                            <Link to='/syllabus'><button type="button" id="syllabusrecord" className="btn btn-outline-warning record navbut" hidden>Back</button></Link>
                        </li>
                        <li>
                            <Link to='/homeworkrecord'><button type="button" id="homeworkrecordnav" className="btn btn-outline-warning record navbut" hidden>Homeworks</button></Link>
                        </li>
                        <li>
                            <Link to='/homework'><button type="button" id="homeworkrecord" className="btn btn-outline-warning record navbut" hidden>Back</button></Link>
                        </li>
                        <li>
                            <Link to='/announcementrecord'><button type="button" id="announcementrecordnav" className="btn btn-outline-warning record navbut" hidden>Announcements</button></Link>
                        </li>
                        <li>
                            <Link to='/announcement'><button type="button" id="announcementrecord" className="btn btn-outline-warning record navbut" hidden>Back</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            </Fragment>
        );    
    }
}

export default Navbar;