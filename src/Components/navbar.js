import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-dark navbar-inverse bg-dark">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to='/'><button type="button" className="btn btn-outline-warning">Home</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            </Fragment>
        );    
    }
}

export default Navbar;