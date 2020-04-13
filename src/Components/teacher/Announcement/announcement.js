import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Axios from 'axios';

class announcement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            curDate: ''
        };
        this.getDate = this.getDate.bind(this);
        this.addAnnouncement = this.addAnnouncement.bind(this);
    }

    componentDidMount() {
        this.getDate();
    }

    getDate() {
        const tempDate = new Date();
        const date = tempDate.getDate() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getFullYear();
        this.setState({
            curDate: date
        });
    }

    addAnnouncement() {
        const aclass = document.getElementById('aclass').value;
        const author = document.getElementById('author').value;
        const adetails = document.getElementById('adetails').value;
        if(aclass && adetails && author) {
            const announcement = {class: aclass, author: author, date: this.state.curDate, details: adetails};
            console.log('Announcement', announcement);
            Axios.post("http://localhost:5000/announcement/add", {data: announcement})
                .then(res => {
                    console.log(res.data.message);
                    document.getElementById('areset').click();
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
                <Navbar />
                <form className="mx-3">
                <label>Date of Announcement:</label><br/>
                <label>{this.state.curDate}</label><br/>
                <label>Name of announcer:</label><br/>
                <input type="text" id="author" size="10"/><br/>
                <label>Class:</label><br/>
                    <select id="aclass">
                        <option value="All">All</option>
                        <option value="Nursery">Nursery</option>
                        <option value="KG">KG</option>
                        <option value="Transition">Transition</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select><br/>
                <label>Announcement:</label><br/>
                <textarea id="adetails" /><br/>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-dark m-2" onClick={this.addAnnouncement}>Add</button>
                    <button type="reset" className="btn btn-dark m-2" id="areset">Reset</button>
                </div>
                </form>
            </Fragment>
        );
    }
}

export default announcement;