import React, { Fragment } from 'react';
import Axios from 'axios';
import './ModalComponent.css';

export default class ModalComponentNew extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
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
        const modal = document.getElementById("myModalNew");
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("myModalNew");
        modal.style.display = "block";
    }

    addMessage() {
        const mname = document.getElementById('mnameNew').value;
        const mtext = document.getElementById('mtextNew').value;
        if(mname && mtext) {
            const message = {name: mname, text: mtext, token: 'new', id: '', reply: [], date: this.state.curDate};
            console.log('Message', message);
            Axios.post("http://localhost:5000/query/add", {data: message})
                .then((res) => {
                    console.log(res.data.message);
                    document.getElementById('mresetNew').click();
                    Axios.get("http://localhost:5000/query/find")
                        .then(res => {
                            console.log(res.data.message);
                            this.props.receive(res.data.body);
                            const modal = document.getElementById("myModalNew");
                            modal.style.display = "none";
                        })
                },
                err => {
                    console.log('Error');
                })
        } else {
            console.log('Error');
        }
    }

    render(){
        return(
            <Fragment>
                    <button id="myBtnNew" onClick={this.handleShow} hidden>Open Modal</button>

                    <div id="myModalNew" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                {this.state.curDate}
                                <div id="closeNew" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Name:</label><br/>
                                <input type="text" id="mnameNew" size="10"/><br/>
                                <label>Text:</label><br/>
                                <textarea id="mtextNew"  cols="15"/><br/>
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="btn btn-dark m-2" onClick={this.addMessage}>Add</button>
                                    <button type="reset" className="btn btn-dark m-2" id="mresetNew">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}