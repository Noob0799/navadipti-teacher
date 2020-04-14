import React, { Fragment } from 'react';
import Axios from 'axios';
import './ModalComponent.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ModalComponentReply extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            chat: {},
            curDate: ''
        };
        this.addMessage = this.addMessage.bind(this);
        this.getDate = this.getDate.bind(this);
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
        const date = tempDate.getDate() + '-' + month + '-' + tempDate.getFullYear();
        this.setState({
            curDate: date
        });
    }

    handleClose = () => {
        const modal = document.getElementById("myModalReply");
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("myModalReply");
        modal.style.display = "block";
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return ({
          chat: nextProps.chat
        });
    }
  
    addMessage() {
        const mname = document.getElementById('mnameReply').value;
        const mtext = document.getElementById('mtextReply').value;
        if(mname && mtext) {
            const message = {name: mname, text: mtext, token: 'reply',date: this.state.curDate};
            this.state.chat.reply.push(message);
            console.log('Updated chat', this.state.chat);
            Axios.put("http://localhost:5000/query/update", {data: this.state.chat})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('mresetReply').click();
                    Axios.get("http://localhost:5000/query/find")
                        .then(res => {
                            console.log(res.data.message);
                            this.props.receive(res.data.body);
                            this.notifyA('Success');
                            const modal = document.getElementById("myModalReply");
                            modal.style.display = "none";
                        })
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
                    <button id="myBtnReply" onClick={this.handleShow} hidden>Open Modal</button>
                    <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.TOP_CENTER} autoClose={2000}/>
                    <div id="myModalReply" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                {this.state.curDate}
                                <div id="closeReply" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Name:</label><br/>
                                <input type="text" id="mnameReply" size="10"/><br/>
                                <label>Text:</label><br/>
                                <textarea id="mtextReply"  cols="15"/><br/>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark m-2" onClick={this.addMessage}>Add</button>
                                    <button type="reset" className="btn btn-dark m-2" id="mresetReply">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}