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
        this.editAnnouncement = this.editAnnouncement.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
          data: nextProps.obj
        });
      }

    handleClose = () => {
        const modal = document.getElementById("announcementeditmodal" + this.state.data._id);
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("announcementeditmodal" + this.state.data._id);
        modal.style.display = "block";
    }

    handleToggle() {
        this.setState({
          open: !this.state.open
        });
      }

    deleteItem() {
        this.props.delete(this.state.data._id);
    }

    editItem() {
        document.getElementById('announcementeditbutton' + this.state.data._id).click();
        document.getElementById('announcementeditclass' + this.state.data._id).value = this.state.data.class;
        if(this.state.data.details) {
            document.getElementById('announcementeditdetails' + this.state.data._id).defaultValue = this.state.data.details;
        } else {
            document.getElementById('announcementeditdetails' + this.state.data._id).defaultValue = '';
        }
    }

    editAnnouncement() {
        const details = document.getElementById('announcementeditdetails' + this.state.data._id).value;
        const clas = document.getElementById('announcementeditclass' + this.state.data._id).value;
        if(details && clas) {
            const message = {_id: this.state.data._id, details: details, class: clas, author: this.state.data.author, date: this.state.data.date};
            Axios.put("/announcement/edit", {data: {data: message}})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('announcementeditclose' + this.state.data._id).click();
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
                    </li>
                    <Collapse in={this.state.open}>
                        <div id={"example-collapse-text" + this.state.data._id} className="homework-container card m-1 p-1" disabled>
                            <div className="card-body">
                                <label className="card-text">{this.state.data.details}</label><br/>
                                <label className="card-text">{this.state.data.author}</label>
                            </div>
                        </div>
                    </Collapse>
                </ul>
                <button id={"announcementeditbutton" + this.state.data._id} onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id={"announcementeditmodal" + this.state.data._id} className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id={"announcementeditclose" + this.state.data._id} className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Class:</label><br/>
                                    <select id={"announcementeditclass" + this.state.data._id}>
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
                                <textarea id={"announcementeditdetails" + this.state.data._id} cols="15"/><br/>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark m-2" onClick={this.editAnnouncement}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </Fragment>
        );
    }
}

export default Card;