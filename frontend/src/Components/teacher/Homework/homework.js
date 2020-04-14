import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class homework extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            minDate: ''
        };
        this.getDate = this.getDate.bind(this);
        this.addHomework = this.addHomework.bind(this);
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
        console.log(minDate);
        this.setState({
            minDate: minDate
        });
    }

    addHomework() {
        const hclass = document.getElementById('hclass').value;
        const hsubject = document.getElementById('hsubject').value;
        const hdate = document.getElementById('hdate').value;
        const hdetails = document.getElementById('hdetails').value;
        if(hclass === 'Nursery' || hclass === 'KG') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics'){
                console.log('Error');
                return;
            }
        }
        if(hclass === 'Transition') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics' && hsubject !== 'GK'){
                console.log('Error');
                return;
            }
        }
        if(hclass === '1') {
            if(hsubject !== 'English' && hsubject !== 'Bengali' && hsubject !== 'Mathematics' && hsubject !== 'GK' && hsubject !== 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(hclass === '2' || hclass === '3') {
            if(hsubject === 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(hclass && hsubject && hdate && hdetails) {
            const homework = {class: hclass, subject: hsubject, date: hdate, details: hdetails};
            console.log('Homework', homework);
            Axios.post("/homework/add", {data: homework})
                .then(res => {
                    console.log(res.data.message);
                    document.getElementById('hreset').click();
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
                <Navbar token='homework'/>
                <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                <div className="jumbotron m-1">
                    <h5>Add Homework:</h5>
                </div>
                <form className="mx-3">
                    <label>Class:</label><br/>
                    <select id="hclass">
                        <option value="Nursery">Nursery</option>
                        <option value="KG">KG</option>
                        <option value="Transition">Transition</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select><br/>
                    <label>Subject:</label><br/>
                    <select id="hsubject">
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="GK">GK</option>
                        <option value="EVS">EVS</option>
                        <option value="History">History</option>
                        <option value="Geograpgy">Geography</option>
                        <option value="Science">Science</option>
                    </select><br/>
                    <label>To be checked on:</label><br/>
                    <input type="date" id="hdate" min={this.state.minDate}/><br/>
                    <label>Homework details:</label><br/>
                    <textarea id="hdetails" cols="15"/><br/>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-dark m-2" onClick={this.addHomework}>Add</button>
                        <button type="reset" className="btn btn-dark m-2" id="hreset">Reset</button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default homework;