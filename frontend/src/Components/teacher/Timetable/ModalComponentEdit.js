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
        this.editEvent = this.editEvent.bind(this);
    }

    handleClose = () => {
        const modal = document.getElementById("eventeditmodal");
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("eventeditmodal");
        modal.style.display = "block";
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
          chat: nextProps.data
        });
    }

    componentDidUpdate() {
        document.getElementById('eventeditdetails').defaultValue = this.state.chat.details;
        document.getElementById('eventeditname').defaultValue = this.state.chat.name;
        document.getElementById('eventedittime').defaultValue = this.state.chat.time;
        document.getElementById('eventeditdate').defaultValue = this.state.chat.date;
        document.getElementById('eventeditclass').defaultValue = this.state.chat.class;
    }
  
    editEvent() {
        const details = document.getElementById('eventeditdetails').value;
        const clas = document.getElementById('eventeditclass').value;
        const name = document.getElementById('eventeditname').value;
        const date = document.getElementById('eventeditdate').value;
        const time = document.getElementById('eventedittime').value;
        if(date && name) {
            const message = {_id: this.state.chat._id, details: details, class: clas, name: name, date: date, time: time};
            Axios.put("/event/edit", {data: {data: message}})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('eventeditclose').click();
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
                    <button id="eventeditbutton" onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id="eventeditmodal" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id="eventeditclose" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Event date:</label><br/>
                                <input type="date" id="eventeditdate" min={this.state.minDate}/><br/>
                                <label>Class:</label><br/>
                                <select id="eventeditclass">
                                    <option value="All">All</option>
                                    <option value="Nursery">Nursery</option>
                                    <option value="KG">KG</option>
                                    <option value="Transition">Transition</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select><br/>
                                <label>Event name:</label><br/>
                                <input type="text" id="eventeditname" size="10"/><br/>
                                <label>Event time:</label><br/>
                                <input type="time" id="eventedittime"/><br/>
                                <label>Event details:</label><br/>
                                <textarea id="eventeditdetails" cols="15"/><br/>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark m-2" onClick={this.editEvent}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}