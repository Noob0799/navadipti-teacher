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
        this.editHomework = this.editHomework.bind(this);
    }

    handleClose = () => {
        const modal = document.getElementById("homeworkeditmodal");
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("homeworkeditmodal");
        modal.style.display = "block";
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let temp = {};
        // eslint-disable-next-line
        for( let i=0;i<nextProps.data.length ; i++) {
            if(nextProps.data[i]._id === nextProps.id) {
                temp = nextProps.data[i];
                break;
            }
        }
        return ({
          chat: temp
        });
    }

    componentDidUpdate() {
        console.log(this.state.chat.details);
        document.getElementById('homeworkeditclass').value = this.state.chat.class;
        document.getElementById('homeworkeditsubject').value = this.state.chat.subject;
        document.getElementById('homeworkeditdate').value = this.state.chat.date;
        if(this.state.chat.img) {
            document.getElementById('hwdispedit').hidden = false;
        } else {
            document.getElementById('hwdispedit').hidden = true;
        }
        if(this.state.chat.details) {
            document.getElementById('homeworkeditdetails' + this.state.chat._id).defaultValue = this.state.chat.details;
        } else {
            document.getElementById('homeworkeditdetails' + this.state.chat._id).defaultValue = '';
        }
    }
  
    editHomework() {
        const details = document.getElementById('homeworkeditdetails' + this.state.chat._id).value;
        let img = document.getElementById('homeworkeditimg').files[0];
        const clas = document.getElementById('homeworkeditclass').value;
        const subject = document.getElementById('homeworkeditsubject').value;
        const date = document.getElementById('homeworkeditdate').value;
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
                    const message = {_id: this.state.chat._id, details: details, class: clas, subject: subject, date: date, img: img};
                    Axios.put("/homework/edit", {data: {data: message}})
                        .then((res) => {
                            console.log(res.data.message);
                            document.getElementById('homeworkeditclose').click();
                            this.notifyA('Success');
                            this.props.editdone(res.data.message);
                        },
                        err => {
                            console.log('Error');
                            this.notifyB('Error');
                        })
                }
            } else {
                if(this.state.chat.img) {
                    img = this.state.chat.img;
                } else {
                    img = '';
                }
                const message = {_id: this.state.chat._id, details: details, class: clas, subject: subject, date: date, img: img};
                Axios.put("/homework/edit", {data: {data: message}})
                    .then((res) => {
                        console.log(res.data.message);
                        document.getElementById('homeworkeditclose').click();
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

    render(){
        return(
            <Fragment>
                    <button id="homeworkeditbutton" onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id="homeworkeditmodal" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id="homeworkeditclose" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form className="mx-3">
                                <label>Class:</label><br/>
                                <select id="homeworkeditclass">
                                    <option value="Nursery">Nursery</option>
                                    <option value="KG">KG</option>
                                    <option value="Transition">Transition</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select><br/>
                                <label>Subject:</label><br/>
                                <select id="homeworkeditsubject">
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
                                <input type="date" id="homeworkeditdate" min={this.state.minDate}/><br/>
                                <label>Homework details:</label><br/>
                                <textarea id={"homeworkeditdetails" + this.state.chat._id} cols="15"/><br/>
                                <div id="hwdispedit" hidden>
                                    <label>Uploaded Homework image:</label><br/>
                                    <label className="card-text"><img src={this.state.chat.img} width="100" height ="100" alt='homework'/></label><br/>
                                </div>
                                <label>Homework image:</label><br/>
                                <input type="file" id="homeworkeditimg" name="homeworkeditimg" accept="image/*"/><br/>
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