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
        this.editHomework = this.editHomework.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
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
        const modal = document.getElementById("homeworkeditmodal" + this.state.data._id);
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("homeworkeditmodal" + this.state.data._id);
        modal.style.display = "block";
    }

    deleteItem() {
        this.props.delete(this.state.data._id);
    }

    editItem() {
        document.getElementById('homeworkeditbutton' + this.state.data._id).click();
        document.getElementById('homeworkeditclass' + this.state.data._id).value = this.state.data.class;
        document.getElementById('homeworkeditsubject' + this.state.data._id).value = this.state.data.subject;
        document.getElementById('homeworkeditdate' + this.state.data._id).value = this.state.data.date;
        if(this.state.data.img) {
            document.getElementById('hwdispedit' + this.state.data._id).hidden = false;
        } else {
            document.getElementById('hwdispedit' + this.state.data._id).hidden = true;
        }
        if(this.state.data.details) {
            document.getElementById('homeworkeditdetails' + this.state.data._id).defaultValue = this.state.data.details;
        } else {
            document.getElementById('homeworkeditdetails' + this.state.data._id).defaultValue = '';
        }
    }

    componentDidUpdate() {
        if(this.state.data.img) {
            document.getElementById('hwdisp' + this.state.data._id).hidden = false;
        } else {
            document.getElementById('hwdisp' + this.state.data._id).hidden = true;
        }
    }

    editHomework() {
        const details = document.getElementById('homeworkeditdetails' + this.state.data._id).value;
        let img = document.getElementById('homeworkeditimg' + this.state.data._id).files[0];
        const clas = document.getElementById('homeworkeditclass' + this.state.data._id).value;
        const subject = document.getElementById('homeworkeditsubject' + this.state.data._id).value;
        const date = document.getElementById('homeworkeditdate' + this.state.data._id).value;
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
        if ((details && clas && subject && date) || (img && clas && subject && date) || (details && img && clas && subject && date)) {
            if(img) {
                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onloadend = () => {
                    img = reader.result;
                    const message = {_id: this.state.data._id, details: details, class: clas, subject: subject, date: date, img: img};
                    Axios.put("/homework/edit", {data: {data: message}})
                        .then((res) => {
                            console.log(res.data.message);
                            document.getElementById('homeworkeditclose' + this.state.data._id).click();
                            this.notifyA('Success');
                            this.props.editdone(res.data.message);
                        },
                        err => {
                            console.log('Error');
                            this.notifyB('Error');
                        })
                }
            } else {
                if(this.state.data.img) {
                    img = this.state.data.img;
                } else {
                    img = '';
                }
                const message = {_id: this.state.data._id, details: details, class: clas, subject: subject, date: date, img: img};
                Axios.put("/homework/edit", {data: {data: message}})
                    .then((res) => {
                        console.log(res.data.message);
                        document.getElementById('homeworkeditclose' + this.state.data._id).click();
                        this.notifyA('Success');
                        this.props.editdone(res.data.message);
                    },
                    err => {
                        console.log('Error');
                        this.notifyB('Error');
                    })
            }
        }else {
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
                    </li>
                    <Collapse in={this.state.open}>
                        <div id={"example-collapse-text" + this.state.data._id} className="homework-container card m-1 p-1" disabled>
                            <div className="card-body">
                                <label className="card-text">{this.state.data.details}</label><br/>
                                <label className="card-text" id={"hwdisp" + this.state.data._id} hidden><img src={this.state.data.img} width="100" height ="100" alt='homework'/></label><br/>
                                <label className="card-text">{this.state.data.date}</label>
                            </div>
                        </div>
                    </Collapse>
                </ul>
                <button id={"homeworkeditbutton" + this.state.data._id} onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id={"homeworkeditmodal" + this.state.data._id} className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id={"homeworkeditclose" + this.state.data._id} className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form className="mx-3">
                                <label>Class:</label><br/>
                                <select id={"homeworkeditclass" + this.state.data._id}>
                                    <option value="Nursery">Nursery</option>
                                    <option value="KG">KG</option>
                                    <option value="Transition">Transition</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select><br/>
                                <label>Subject:</label><br/>
                                <select id={"homeworkeditsubject" + this.state.data._id}>
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
                                <label>To be checked on:</label><br/>
                                <input type="date" id={"homeworkeditdate" + this.state.data._id} min={this.state.minDate}/><br/>
                                <label>Homework details:</label><br/>
                                <textarea id={"homeworkeditdetails" + this.state.data._id} cols="15"/><br/>
                                <div id={"hwdispedit" + this.state.data._id} hidden>
                                    <label>Uploaded Homework image:</label><br/>
                                    <label className="card-text"><img src={this.state.data.img} width="100" height ="100" alt='homework'/></label><br/>
                                </div>
                                <label>Homework image:</label><br/>
                                <input type="file" id={"homeworkeditimg" + this.state.data._id} name="homeworkeditimg" accept="image/*"/><br/>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark m-2" onClick={this.editHomework}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </Fragment>
        );
    }
}

export default Card;