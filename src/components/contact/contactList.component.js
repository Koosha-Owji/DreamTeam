import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
//import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import DeleteContact from './DeleteContact.component';
import SendContactEmail from './SendContactEmail.component';
import ContactLabel from './ContactLabel.component';
import Update from './UpdateContact.component';
import {get_all_contacts,delete_contact} from '../../api/index';

export default class ContactCard extends Component{
constructor(props){
    super(props);
    this.state = {contacts: []};
    this.delete_contact = this.deleteContact.bind(this)
    
}

componentDidMount() {
    //axios.get('http://localhost:5000/contacts')
    get_all_contacts()
      .then(response => {
        this.setState({ contacts: response.data })
      })
      .then(console.log('contacts received'))
      .catch((error) => {
        console.log(error);
      })
  }

  deleteContact=(id)=>{
    //axios.post('http://localhost:5000/contacts/delete/'+id)
    delete_contact(id)
    .then(response =>{  console.log(response.data)});

    this.setState({
      contacts:this.state.contacts.filter(el =>el._id !== id)
    })
  }
  

  displayContactList=(contacts)=>{
    if(!contacts.length) return null;

    return contacts.map((contact, index)=>(
      <div key = {index} className ='contactListItem' style={{padding:'10px'}}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
      <Grid item xs={6}>
      <Typography className='first_name' style={{textAlign:'left'}}>{contact.first_name} {contact.last_name}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography className='business' style={{textAlign:'left'}}>{contact.business}</Typography>
        </Grid>
        <Grid item xs={6}>
        <ContactLabel/>
        </Grid>
        <Grid item xs={1}>
        <SendContactEmail/> 
        </Grid>
        <Grid item xs={1} textA>
        <Update currId ={contact._id} allContacts={contacts}/>
        </Grid>
        <Grid item xs={1}>
        <DeleteContact id={contact._id} deleteContact={this.deleteContact}/>
        </Grid>
        </AccordionSummary>


        <AccordionDetails className='contactExpand'style={{display:'block'}}> 
        <Typography className='email_address' style={{textAlign:'left'}}>Email {contact.email_address}</Typography>
        <Typography className='phone_number' style={{textAlign:'left'}}>Phone Number      {contact.phone_number}</Typography>
        <Typography className='relationship' style={{textAlign:'left'}}>Relationship      {contact.relationship}</Typography>
        <Typography className='description' style={{textAlign:'left'}}>Description      {contact.description}</Typography>
        </AccordionDetails>
        <Divider />
        </Accordion>
      </div>
    ));

  }

  render(){

      console.log('State: ', this.state);

      return(
    <div className ='contactList'>
    {this.displayContactList(this.state.contacts)}
  </div>
     
      );
    }
}