import React, { Fragment } from 'react';
import Navbar from '../navbar';

class record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }

    componentDidMount() {
        const { token } = this.props.location.state;
        console.log('Token', token);
        if(token === 'event') {}
        if(token === 'syllabus') {}
        if(token === 'homework') {}
        if(token === 'announcement') {}
    }

    render() {
        return (
            <Fragment>
                <Navbar token='record'/>
            </Fragment>
        );    
    }
}

export default record;