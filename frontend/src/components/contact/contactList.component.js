/**
 * contactList.component.js, component that lists all ocntacts belonging to a user
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
 import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DeleteContact from './DeleteContact.component';
import SendContactEmail from './SendContactEmail.component';
import ContactLabel from './ContactLabel.component';
import Update from './UpdateContact.component';
import {get_all_contacts,delete_contact} from '../../api/index';
import AddContactLabel from '../label/AddContactLabel.component';
import SearchContact from './SearchContact.component';
import AddContactButton from './AddContactButton.component';
import ManageLabelButton from './../label/ManageLabelsButton.component';


export default class ContactCard extends Component{
constructor(props){
    super(props);
    this.state = {contacts: []};
    this.delete_contact = this.deleteContact.bind(this);
    this.updateView=this.updateView.bind(this);
    this.updateView2=this.updateView2.bind(this);
    
    
}

componentDidMount() {
    get_all_contacts()
      .then(response => {
        this.setState({ contacts: response.data })
      })
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(this.state.flag===true){
  //     get_all_contacts()
  //     .then(response => {
  //       this.setState({ contacts: response.data })
  //     })
  //     .then(this.setFlag(false))
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //   }
  // }

updateView =(newContact)=>{
  console.log("update view called")
  let a = this.state.contacts.slice();
  a.push(newContact)
  this.setState((state) => {
    return {contacts: a}
  });
}

updateView2=(updatedContact)=>{
  this.setState({
    contacts:this.state.contacts.filter(el =>el._id !== updatedContact._id)
  })
  let a = this.state.contacts.slice();
  let toRem = null;
  for(let i=0; i<a.length; i++){
    if(a[i]._id==updatedContact._id){
      toRem=a[i];
    }
  }
  if(toRem){
    a.pop(toRem);
    a.push(updatedContact);
    
    
    this.setState((state) => {
      return {contacts: a}
    });
  }

}



  deleteContact=(id)=>{
    delete_contact(id)

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
        <Grid item xs={4}>
            <AddContactLabel contact_id={contact._id} />
            </Grid>
        <Grid item xs={6}>
        <ContactLabel contact_id={contact._id}/>
        
        </Grid>
        
        <Grid item xs={1}>
          <SendContactEmail/>
        </Grid>
        <Grid item xs={1} textA>
        <Update currId ={contact._id} allContacts={contacts} updateView2={this.updateView2} />
        </Grid>
        <Grid item xs={1}>
        <DeleteContact id={contact._id} deleteContact={this.deleteContact}/>
        </Grid>
        </AccordionSummary>


        <AccordionDetails className='contactExpand'style={{display:'block'}}> 
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={3}>
          <Typography className='email_address' style={{textAlign:'left'}}>Email {contact.email_address}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className='phone_number' style={{textAlign:'left'}}>Phone Number      {contact.phone_number}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className='relationship' style={{textAlign:'left'}}>Relationship      {contact.relationship}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className='description' style={{textAlign:'left'}}>Description      {contact.description}</Typography>
        </Grid>
        </AccordionDetails>
        <Divider />
        </Accordion>
      </div>
    ));

  }

  render(){


      return(
    <div className ='contactList'>
      <AddContactButton updateView ={this.updateView}/> <ManageLabelButton/>
      <SearchContact/>
    {this.displayContactList(this.state.contacts)}
  </div>
     
      );
    }
}