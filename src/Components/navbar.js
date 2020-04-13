import React, { Fragment } from 'react';
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
        if(this.state.token === 'query' || this.state.token === 'record') {
            document.getElementById('recordnav').hidden = true;
        } else if(this.state.token === 'syllabus' || this.state.token === 'homework' || this.state.token === 'announcement' || this.state.token === 'event') {
            document.getElementById('recordnav').hidden = false;
        }
    }

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
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            <Link to={{
                                pathname: '/record',
                                state: {
                                    token: this.state.token
                                }
                            }}><button type="button" id="recordnav" className="btn btn-outline-warning record" hidden>Record</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            </Fragment>
        );    
    }
}

export default Navbar;