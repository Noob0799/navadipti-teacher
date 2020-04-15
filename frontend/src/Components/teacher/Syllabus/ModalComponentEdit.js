import React, { Fragment } from 'react';
import Axios from 'axios';
import './ModalComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ModalComponentEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            chat: {}
        };
        this.editSyllabus = this.editSyllabus.bind(this);
    }

    handleClose = () => {
        const modal = document.getElementById("syllabuseditmodal");
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("syllabuseditmodal");
        modal.style.display = "block";
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
          chat: nextProps.data
        });
    }

    componentDidUpdate() {
        document.getElementById('syllabuseditdetails').defaultValue = this.state.chat.details;
        document.getElementById('syllabuseditclass').value = this.state.chat.class;
        document.getElementById('syllabuseditsubject').value = this.state.chat.subject;
        document.getElementById('syllabuseditterm').value = this.state.chat.term;
    }
  
    editSyllabus() {
        const details = document.getElementById('syllabuseditdetails').value;
        const clas = document.getElementById('syllabuseditclass').value;
        const subject = document.getElementById('syllabuseditsubject').value;
        const term = document.getElementById('syllabuseditterm').value;
        if(clas === 'Nursery' || clas === 'KG') {
            if(subject !== 'English' && subject !== 'Bengali' && subject !== 'Mathematics' && subject !== 'GK'){
                console.log('Error');
                return;
            }
        }
        if(clas === 'Transition') {
            if(subject !== 'English' && subject !== 'Bengali' && subject !== 'Mathematics' && subject !== 'GK'){
                console.log('Error');
                return;
            }
        }
        if(clas === '1') {
            if(subject !== 'English' && subject !== 'Bengali' && subject !== 'Mathematics' && subject !== 'GK' && subject !== 'EVS' && subject !== 'Computer'){
                console.log('Error');
                return;
            }
        }
        if(clas === '2' || clas === '3') {
            if(subject === 'EVS'){
                console.log('Error');
                return;
            }
        }
        if(details && clas && subject && term) {
            const message = {_id: this.state.chat._id, details: details, class: clas, subject: subject, term: term};
            Axios.put("/syllabus/edit", {data: {data: message}})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('syllabuseditclose').click();
                    this.notifyA('Success');
                    this.props.editdone(res.data.message);
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

    render(){
        return(
            <Fragment>
                    <button id="syllabuseditbutton" onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id="syllabuseditmodal" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id="syllabuseditclose" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form className="mx-3">
                                <label>Class:</label><br/>
                                <select id="syllabuseditclass">
                                    <option value="Nursery">Nursery</option>
                                    <option value="KG">KG</option>
                                    <option value="Transition">Transition</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select><br/>
                                <label>Subject:</label><br/>
                                <select id="syllabuseditsubject">
                                    <option value="English">English</option>
                                    <option value="Bengali">Bengali</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="GK">GK</option>
                                    <option value="EVS">EVS</option>
                                    <option value="History">History</option>
                                    <option value="Geography">Geography</option>
                                    <option value="Science">Science</option>
                                    <option value="Computer">Computer</option>
                                </select><br/>
                                <label>Term:</label><br/>
                                <select id="syllabuseditterm">
                                    <option value="1">1st Test</option>
                                    <option value="2">2nd Test</option>
                                    <option value="HY">Half Yearly</option>
                                    <option value="3">3rd Test</option>
                                    <option value="4">4th Test</option>
                                    <option value="A">Annual</option>
                                </select><br/>
                                <label>Syllabus details:</label><br/>
                                <textarea id="syllabuseditdetails" cols="15"/><br/>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark m-2" onClick={this.editSyllabus}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}