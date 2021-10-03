/**
 * addContact.component.js, front end component for adding a new contact
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
 import React, { Component } from 'react';
 import { Typography } from '@material-ui/core';
 import {get_contact} from './../../api/index';
 
 

 export default class OrderContact extends Component {
 
        constructor(props){
            super(props);
            this.state = {
                contact:''
              };
            this.contact_id=this.props.contact_id;
        
            }
    
       componentDidMount() {
         get_contact(this.contact_id)
           .then(response => {
             this.setState({ contact: response.data })
           })
           .then(console.log('contact received'))
           .catch((error) => {
             console.log(error);
           })
       }
       
 
      
   
    //    displayLabelDropdown(labels){
    //      if(!labels.length) return null;
    //        return labels.map((label, index)=>(
    //          <MenuItem value={label._id} style={{backgroundColor:`${label.colour}`}}>{label.title}</MenuItem>
   
    //        ))
    //    }
       
 
   render() {
     
     return (
         
             <Typography>{this.state.contact.first_name} {this.state.contact.last_name}</Typography>
         
     );
   }
 }