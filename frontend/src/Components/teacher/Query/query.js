import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import ChatCard from '../Chatcard/chatcard';
import ModalComponentNew from '../Modal/ModalComponentNew';
import Navbar from '../../navbar';
import './query.css';

class query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleReceive = this.handleReceive.bind(this);
        this.myDivToFocus = React.createRef()
        this.getData();
    }

    handleClick() {
        ReactDOM.render(<ModalComponentNew receive={this.handleReceive}/>, document.getElementById('newmodalhere'));
        document.getElementById('myBtnNew').click();
    }

    handleOnClick = (event) => {
        if(this.myDivToFocus.current){
            this.myDivToFocus.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "nearest"
            })
        }
    }

    getData() {
        Axios.get("/query/find")
            .then(res => {
                console.log(res.data.message);
                this.handleReceive(res.data.body);
            })
    }

    handleReceive(data) {
        console.log('Chats', data);
        this.setState({
            data: data
        });
    }

    render() {
        return(
            <Fragment>
                <Navbar token='query'/>
                <button type="button" className="btn btn-dark text" onClick={this.handleClick}><i className="fa fa-plus" aria-hidden="true"></i></button>
                <button type="button" className="btn btn-dark scrolldown" onClick={this.handleOnClick}><i className="fa fa-arrow-down" aria-hidden="true"></i></button>
                <div className="accordion" id="space">
                    {
                        this.state.data.map(obj => {
                            return (
                                <div key={obj._id} className="m-2">
                                    <ChatCard chat = {obj} receive={this.handleReceive}/>
                                </div>
                            );
                        })
                    }
                </div>
                <div ref={this.myDivToFocus}></div>
                <div id="newmodalhere"></div>
            </Fragment>
        );
    }
}

export default query;