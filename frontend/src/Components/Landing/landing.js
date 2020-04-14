import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './landing.css';
import * as logo from './logoschool.jpeg';

class landing extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="heading p-1">
                    <h1>Nava Dipti School <img src={logo} alt="logo" height="90" width="90"/></h1>
                </div>
                <div className="landingparent">
                    <ul className="list-group">
                        <Link to='/timetable'><li className="btn btn-dark m-2">Academic Calendar</li></Link>
                        <Link to='/syllabus'><li className="btn btn-dark m-2">Syllabus</li></Link>
                        <Link to='/homework'><li className="btn btn-dark m-2">Homework</li></Link>
                        <Link to='/announcement'><li className="btn btn-dark m-2">Announcements</li></Link>
                        <Link to='/query'><li className="btn btn-dark m-2">Q/A</li></Link>   
                    </ul>
                </div>
            </Fragment>
        );    
    }
}

export default landing;