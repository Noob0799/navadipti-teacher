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
        this.editEvent = this.editEvent.bind(this);
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
        const modal = document.getElementById("eventeditmodal" + this.state.data._id);
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("eventeditmodal" + this.state.data._id);
        modal.style.display = "block";
    }

    deleteItem() {
        this.props.delete(this.state.data._id);
    }

    editItem() {
        document.getElementById('eventeditbutton' + this.state.data._id).click();
        document.getElementById('eventeditname' + this.state.data._id).defaultValue = this.state.data.name;
        document.getElementById('eventedittime' + this.state.data._id).value = this.state.data.time;
        document.getElementById('eventeditdate' + this.state.data._id).value = this.state.data.date;
        document.getElementById('eventeditclass' + this.state.data._id).value = this.state.data.class;
        if(this.state.data.details) {
            document.getElementById('eventeditdetails' + this.state.data._id).defaultValue = this.state.data.details;
        } else {
            document.getElementById('eventeditdetails' + this.state.data._id).defaultValue = '';
        }
    }

    editEvent() {
        const details = document.getElementById('eventeditdetails' + this.state.data._id).value;
        const clas = document.getElementById('eventeditclass' + this.state.data._id).value;
        const name = document.getElementById('eventeditname' + this.state.data._id).value;
        const date = document.getElementById('eventeditdate' + this.state.data._id).value;
        const time = document.getElementById('eventedittime' + this.state.data._id).value;
        if(date && name) {
            const message = {_id: this.state.data._id, details: details, class: clas, name: name, date: date, time: time};
            Axios.put("/event/edit", {data: {data: message}})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('eventeditclose' + this.state.data._id).click();
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
                        <label className="datename">Date: {this.state.data.date}</label><br/>
                        <label className="datename">Class: {this.state.data.class}</label><br/>
                        <label className="datename">Name: {this.state.data.name}</label><br/>
                    </li>
                    <Collapse in={this.state.open}>
                        <div id={"example-collapse-text" + this.state.data._id} className="homework-container card m-1 p-1" disabled>
                            <div className="card-body">
                                <label className="card-text">{this.state.data.details}</label><br/>
                                <label className="card-text">{this.state.data.time}</label>
                            </div>
                        </div>
                    </Collapse>
                </ul>
                <button id={"eventeditbutton" + this.state.data._id} onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id={"eventeditmodal" + this.state.data._id} className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id={"eventeditclose" + this.state.data._id} className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Event date:</label><br/>
                                <input type="date" id={"eventeditdate" + this.state.data._id} min={this.state.minDate}/><br/>
                                <label>Class:</label><br/>
                                <select id={"eventeditclass" + this.state.data._id}>
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
                                <input type="text" id={"eventeditname" + this.state.data._id} size="10"/><br/>
                                <label>Event time:</label><br/>
                                <input type="time" id={"eventedittime" + this.state.data._id}/><br/>
                                <label>Event details:</label><br/>
                                <textarea id={"eventeditdetails" + this.state.data._id} cols="15"/><br/>
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

export default Card;