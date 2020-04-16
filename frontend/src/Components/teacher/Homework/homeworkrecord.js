import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Card from './card';
import Axios from 'axios';

class HomeworkRecord extends React.Component {
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

    groupTogether(data) {
        const temparray = [];
        const nursery = [];
        const kg = [];
        const transition = [];
        const one = [];
        const two = [];
        const three = [];
        const four = [];
        data.forEach(element => {
            if(element.class === 'Nursery') {
                nursery.push(element);
            } else if(element.class === 'KG') {
                kg.push(element);
            } else if(element.class === 'Transition') {
                transition.push(element);
            } else if(element.class === '1') {
                one.push(element);
            } else if(element.class === '2') {
                two.push(element);
            } else if(element.class === '3') {
                three.push(element);
            } else if(element.class === '4') {
                four.push(element);
            }
        });
        nursery.forEach(element => {
            temparray.push(element);
        });
        kg.forEach(element => {
            temparray.push(element);
        });
        transition.forEach(element => {
            temparray.push(element);
        });
        one.forEach(element => {
            temparray.push(element);
        });
        two.forEach(element => {
            temparray.push(element);
        });
        three.forEach(element => {
            temparray.push(element);
        });
        four.forEach(element => {
            temparray.push(element);
        });
        return temparray;
    }

    handleToggle() {
        this.setState({
          open: !this.state.open
        });
    }

    deleteItem(id) {
        console.log('Delete', id);
        Axios.delete("/homework/delete", {data: {id: id}})
            .then(res => {
                console.log(res.data.message);
                this.getData();
            },
            err => {
                console.log('Error');
            })
    }

    editItem(message) {
        if (message) {
            this.getData();
        }
    }

    getData() {
        Axios.get("/homework/get")
            .then(res => {
                console.log(res.data.message, res.data.data);
                const temparray = this.groupTogether(res.data.data);
                this.setState({
                    data: temparray,
                    token: 'homeworkrecord'
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

export default HomeworkRecord;