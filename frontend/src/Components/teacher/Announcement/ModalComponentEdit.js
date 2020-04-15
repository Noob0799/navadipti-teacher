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
        this.editAnnouncement = this.editAnnouncement.bind(this);
    }

    handleClose = () => {
        const modal = document.getElementById("announcementeditmodal");
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("announcementeditmodal");
        modal.style.display = "block";
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
          chat: nextProps.data
        });
    }

    componentDidUpdate() {
        document.getElementById('announcementeditdetails').defaultValue = this.state.chat.details;
        document.getElementById('announcementeditclass').value = this.state.chat.class;
    }
  
    editAnnouncement() {
        const details = document.getElementById('announcementeditdetails').value;
        const clas = document.getElementById('announcementeditclass').value;
        if(details && clas) {
            const message = {_id: this.state.chat._id, details: details, class: clas, author: this.state.chat.author, date: this.state.chat.date};
            Axios.put("/announcement/edit", {data: {data: message}})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('announcementeditclose').click();
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
                    <button id="announcementeditbutton" onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id="announcementeditmodal" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div id="announcementeditclose" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Class:</label><br/>
                                    <select id="announcementeditclass">
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
                                <textarea id="announcementeditdetails" cols="15"/><br/>
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