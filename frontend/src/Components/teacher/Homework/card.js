import React, { Fragment } from 'react';
import Collapse from 'react-bootstrap/Collapse';

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

    deleteItem() {
        this.props.delete(this.state.data._id);
    }

    editItem() {
        this.props.edit(this.state.data);
    }

    componentDidUpdate() {
        if(this.state.data.img) {
            document.getElementById('hwdisp' + this.state.data._id).hidden = false;
        } else {
            document.getElementById('hwdisp' + this.state.data._id).hidden = true;
        }
    }

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
            </Fragment>
        );
    }
}

export default Card;