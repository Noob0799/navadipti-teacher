import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Card from './card';
import Axios from 'axios';

class TimetableRecord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: '',
            data: [],
            open: false
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.getData = this.getData.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    handleToggle() {
        this.setState({
          open: !this.state.open
        });
    }

    deleteItem(id) {
        console.log('Delete', id);
        Axios.delete("/event/delete", {data: {id: id}})
            .then(res => {
                console.log(res.data.message);
                this.getData();
            },
            err => {
                console.log('Error');
            })
    }

    editItem(message) {
        if(message) {
            this.getData();
        }
    }

    getData() {
        Axios.get("/event/get")
            .then(res => {
                console.log(res.data.message, res.data.data);
                this.setState({
                    data: res.data.data,
                    token: 'eventrecord'
                });
            },
            err => {
                console.log('Error');
            })
    }

    render() {
        return(
            <Fragment>
                <Navbar token={this.state.token}/>
                {
                    this.state.data.map(obj => {
                        return (
                            <div key={obj._id}>
                                <Card obj={obj} delete={this.deleteItem} editdone={this.editItem}/>
                            </div>
                        );
                    })
                }
            </Fragment>
        );
    }
}

export default TimetableRecord;