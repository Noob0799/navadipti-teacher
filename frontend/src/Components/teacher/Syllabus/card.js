import React, { Fragment } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Axios from 'axios';
import './ModalComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            open: false
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.editSyllabus = this.editSyllabus.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
          data: nextProps.obj
        });
      }

    handleToggle() {
        this.setState({
          open: !this.state.open
        });
    }

    handleClose = () => {
        const modal = document.getElementById("syllabuseditmodal" + this.state.data._id);
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("syllabuseditmodal" + this.state.data._id);
        modal.style.display = "block";
    }

    deleteItem() {
        this.props.delete(this.state.data._id);
    }

    editItem() {
        document.getElementById('syllabuseditbutton' + this.state.data._id).click();
        document.getElementById('syllabuseditdetails' + this.state.data._id).defaultValue = this.state.data.details;
        document.getElementById('syllabuseditclass' + this.state.data._id).value = this.state.data.class;
        document.getElementById('syllabuseditsubject' + this.state.data._id).value = this.state.data.subject;
        document.getElementById('syllabuseditterm' + this.state.data._id).value = this.state.data.term;
    }

    editSyllabus() {
        const details = document.getElementById('syllabuseditdetails' + this.state.data._id).value;
        const clas = document.getElementById('syllabuseditclass' + this.state.data._id).value;
        const subject = document.getElementById('syllabuseditsubject' + this.state.data._id).value;
        const term = document.getElementById('syllabuseditterm' + this.state.data._id).value;
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
            const message = {_id: this.state.data._id, details: details, class: clas, subject: subject, term: term};
            Axios.put("/syllabus/edit", {data: {data: message}})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('syllabuseditclose' + this.state.data._id).click();
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

    render() {
        return(
            <Fragment>
                <ul className="list-group">
                    <li className="btn btn-dark m-2" onClick={this.handleToggle}
                    aria-controls={"example-collapse-text" + this.state.data._id}
                    aria-expanded={this.state.open}
                    >
                        <div className="crossdel">
                            <i className="fa fa-edit m-1" aria-hidden="true" onClick={this.editItem}></i>
                            <i className="fa fa-window-close m-1" aria-hidden="true" onClick={this.deleteItem}></i>
                        </div>
                        <label className="datename">Class: {this.state.data.class}</label><br/>
                        <label className="datename">Subject: {this.state.data.subject}</label><br/>
                        <label className="datename">Term: {this.state.data.term}</label>
                    </li>
                    <Collapse in={this.state.open}>
                        <div id={"example-collapse-text" + this.state.data._id} className="syllabus-container card m-1 p-1" disabled>
                            <div className="card-body">
                                <label className="card-text">{this.state.data.details}</label>
                            </div>
                        </div>
                    </Collapse>
                </ul>
                <button id={"syllabuseditbutton" + this.state.data._id} onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id={"syllabuseditmodal" + this.state.data._id} className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id={"syllabuseditclose" + this.state.data._id} className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form className="mx-3">
                                <label>Class:</label><br/>
                                <select id={"syllabuseditclass" + this.state.data._id}>
                                    <option value="Nursery">Nursery</option>
                                    <option value="KG">KG</option>
                                    <option value="Transition">Transition</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select><br/>
                                <label>Subject:</label><br/>
                                <select id={"syllabuseditsubject" + this.state.data._id}>
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
                                <select id={"syllabuseditterm" + this.state.data._id}>
                                    <option value="1">1st Test</option>
                                    <option value="2">2nd Test</option>
                                    <option value="HY">Half Yearly</option>
                                    <option value="3">3rd Test</option>
                                    <option value="4">4th Test</option>
                                    <option value="A">Annual</option>
                                </select><br/>
                                <label>Syllabus details:</label><br/>
                                <textarea id={"syllabuseditdetails" + this.state.data._id} cols="15"/><br/>
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

export default Card;