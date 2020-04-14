import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            Axios.post("/announcement/add", {data: announcement})
                .then(res => {
                    console.log(res.data.message);
                    document.getElementById('areset').click();
                    this.notifyA('Success');
                },
                err => {
                    console.log('Error');
                    this.notifyB('Error');
                })
        } else {
            console.log('Error');
            this.notifyB('Error');
        }
    }

    notifyA = (text) => toast.success(text, {containerId: 'A'});
    notifyB = (text) => toast.error(text, {containerId: 'B'});

    render() {
        return(
            <Fragment>
                <Navbar token='announcement'/>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                <div className="jumbotron m-1">
                    <h5>Add Announcement:</h5>
                </div>
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
                <textarea id="adetails" cols="15"/><br/>
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