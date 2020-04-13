import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Axios from 'axios';

class syllabus extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: ''
        };
    }

    componentDidMount() {
        this.setState({
            token: 'syllabus'
        });
    }

    addSyllabus() {
        const cclass = document.getElementById('cclass').value;
        const ssubject = document.getElementById('ssubject').value;
        const tterm = document.getElementById('tterm').value;
        const details = document.getElementById('details').value;
        if(cclass === 'Nursery' || cclass === 'KG') {
            if(ssubject !== 'English' && ssubject !== 'Bengali' && ssubject !== 'Mathematics'){
                console.log('Error');
                return;
            }
        }
        if(cclass === 'Transition') {
            if(ssubject !== 'English' && ssubject !== 'Bengali' && ssubject !== 'Mathematics' && ssubject !== 'GK'){
                console.log('Error');
                return;
            }
        }
        if(cclass === '1') {
            if(ssubject !== 'English' && ssubject !== 'Bengali' && ssubject !== 'Mathematics' && ssubject !== 'GK' && ssubject !== 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(cclass === '2' || cclass === '3') {
            if(ssubject === 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(cclass && ssubject && tterm && details) {
            const syllabus = {class: cclass, subject: ssubject, term: tterm, details: details};
            console.log('Syllabus', syllabus);
            Axios.post("http://localhost:5000/syllabus/add", {data: syllabus})
                .then(res => {
                    console.log(res.data.message);
                    document.getElementById('rreset').click();
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
                <Navbar token={this.state.token}/>
                <div className="jumbotron m-1">
                    <h5>Add Syllabus:</h5>
                </div>
                <form className="mx-5">
                    <label>Class:</label><br/>
                    <select id="cclass">
                        <option value="Nursery">Nursery</option>
                        <option value="KG">KG</option>
                        <option value="Transition">Transition</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select><br/>
                    <label>Subject:</label><br/>
                    <select id="ssubject">
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="GK">GK</option>
                        <option value="EVS">EVS</option>
                        <option value="History">History</option>
                        <option value="Geograpgy">Geography</option>
                        <option value="Science">Science</option>
                    </select><br/>
                    <label>Term:</label><br/>
                    <select id="tterm">
                        <option value="1">1st Test</option>
                        <option value="2">2nd Test</option>
                        <option value="HY">Half Yearly</option>
                        <option value="3">3rd Test</option>
                        <option value="4">4th Test</option>
                        <option value="A">Annual</option>
                    </select><br/>
                    <label>Syllabus details:</label><br/>
                    <textarea id="details" cols="15"/><br/>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-dark m-2" onClick={this.addSyllabus}>Add</button>
                        <button type="reset" className="btn btn-dark m-2" id="rreset">Reset</button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default syllabus;

