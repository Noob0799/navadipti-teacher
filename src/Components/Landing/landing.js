import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './landing.css';

class landing extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="heading">
                    <h1>Nava Dipti School</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="center-block">
                                <div className="btn-group-vertical">
                                    <Link to='/timetable'><button type="button" className="btn btn-dark my-1">Academic Calendar</button></Link>
                                    <Link to='/syllabus'><button type="button" className="btn btn-dark my-1">Syllabus</button></Link>
                                    <Link to='/homework'><button type="button" className="btn btn-dark my-1">Homework</button></Link>
                                    <Link to='/announcement'><button type="button" className="btn btn-dark my-1">Announcements</button></Link>
                                    <Link to='/query'><button type="button" className="btn btn-dark my-1">Q/A</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );    
    }
}

export default landing;