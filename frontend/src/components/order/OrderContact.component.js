/**
 * OrderContact.component.js, uses contact_id to get contact first name and surname associated with an order
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
    
      /** Get contact associated with the order */
       componentDidMount() {
         get_contact(this.contact_id)
           .then(response => {
             this.setState({ contact: response.data })
           })
           .catch((error) => {
             console.log(error);
           })
       }
       
 
       
 
   render() {
    /**There may not always be a contact for an order so check and return null if not */
    if(!this.state.contact){
      return null;
    }
     
     return (
         
             <Typography>{this.state.contact.first_name} {" "} {this.state.contact.last_name}</Typography>
         
     );
   }
 }