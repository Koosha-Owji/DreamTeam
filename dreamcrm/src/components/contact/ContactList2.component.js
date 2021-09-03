import React, {Component} from "react";
import axios from 'axios';

export default class ContactCard extends Component{
    state={
        title:'',
        body:'',
        contactList:[]
    }

    componentDidMount=()=>{
        this.getContactList();
    }

    getContactList = () =>{
        axios.get('http://localhost:5000/contacts')
        .then((response)=>{
            const contacts = response.data;
            this.setState({contactList:contacts});
            console.log('data recieved');
        })
        .catch(()=>{
            console.log('data not recieved');
        });
    }

    render(){
        return(
            <div className='contactList'></div>
        )

    }
}