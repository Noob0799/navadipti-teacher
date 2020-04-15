import React, { Fragment } from 'react';
import Navbar from '../../navbar';
import Card from './card';
import Axios from 'axios';
import ModalComponentEdit from './ModalComponentEdit';

class SyllabusRecord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            token: '',
            data: [],
            open: false,
            editdata: {}
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
        Axios.delete("/syllabus/delete", {data: {id: id}})
            .then(res => {
                console.log(res.data.message);
                this.getData();
            },
            err => {
                console.log('Error');
            })
    }

    editItem(data) {
        console.log('Edit', data._id);
        this.setState({
            editdata: data
        });
        document.getElementById('syllabuseditbutton').click();
    }

    getData() {
        Axios.get("/syllabus/get")
            .then(res => {
                console.log(res.data.message, res.data.data);
                const temparray = this.groupTogether(res.data.data);
                this.setState({
                    data: temparray,
                    token: 'syllabusrecord'
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
                <ModalComponentEdit data={this.state.editdata} editdone={this.getData}/>
                {
                    this.state.data.map(obj => {
                        return (
                            <div key={obj._id}>
                                <Card obj={obj} delete={this.deleteItem} edit={this.editItem}/>
                            </div>
                        );
                    })
                }
            </Fragment>
        );
    }
}

export default SyllabusRecord;