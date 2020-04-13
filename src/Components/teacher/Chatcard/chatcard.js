import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Collapse from 'react-bootstrap/Collapse';
import './chatcard.css';
import ModalComponentReply from '../Modal/ModalComponentReply';

export default class ChatCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        chat: {}
      };
      this.handleReply = this.handleReply.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
      this.handleReceive = this.handleReceive.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      return ({
        chat: nextProps.chat
      });
    }

    handleToggle() {
      this.setState({
        open: !this.state.open
      });
    }

    handleReply() {
      ReactDOM.render(<ModalComponentReply chat={this.state.chat} receive={this.handleReceive}/>, document.getElementById('replymodalhere'));
      document.getElementById('myBtnReply').click();
    }

    handleReceive(data) {
      this.props.receive(data);
  }

    render() {
      return (
        <Fragment>
          <label className="datename">{this.state.chat.date} {this.state.chat.name}</label><br/>
          <button type="button" className="btn btn-outline-dark" onClick={this.handleToggle}
          aria-controls="example-collapse-text"
          aria-expanded={this.state.open}
          >
              {this.state.chat.text}
          </button>
          <button type="button" className="btn btn-dark reply ml-auto" id={"reply" + this.state.chat._id} onClick={this.handleReply}>Reply</button>
          <Collapse in={this.state.open}>
              <div id="example-collapse-text" className="container-fluid" disabled>
              {
                this.state.chat.reply.map(obj => {
                  return (
                    <div key={this.state.chat._id + Math.random()}>
                      <div className="datename">{obj.date} {obj.name}</div>
                      <div className="chatcard">
                        {obj.text}
                      </div>
                    </div>
                  )
                })
              }
              </div>
          </Collapse>
          <div id="replymodalhere"></div>
        </Fragment>
      );
    }
  }