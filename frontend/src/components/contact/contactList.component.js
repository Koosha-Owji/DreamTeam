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
import AddContactButton from './AddContactButton.component';
import ManageLabelButton from './../label/ManageLabelsButton.component';
import {get_all_labels} from './../../api/index';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class ContactCard extends Component{
constructor(props){
    super(props);
    this.state = {
      contacts: [], 
      filtered:[],
      labels:[],
      searchLabel:''
      };
    this.delete_contact = this.deleteContact.bind(this);
    this.updateView=this.updateView.bind(this);
    this.updateView2=this.updateView2.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.onChangeLabel=this.onChangeLabel.bind(this);
    
}

/**Keep contacts fresh */
componentDidMount() {
    get_all_contacts()
      .then(response => {
        this.setState({ filtered: response.data, contacts:response.data })
      })
      get_all_labels()
           .then(response => {
             this.setState({ labels: response.data })
           })
           .catch((error) => {
             console.log(error);
           })
  }

   /**Display labels in a dropdown from which we can select one to assign to a contact */
   displayLabelDropdown(labels){
    if(!labels.length) return null;
      return labels.map((label, index)=>(
        <MenuItem value={label._id} style={{backgroundColor:`${label.colour}`}}>{label.title}</MenuItem>

      ))
  }

  onChangeLabel(e){
    console.log(this.state.filtered);
    for(let i = 0; i<this.state.filtered.length; i++){
      for(let j=0; j<this.state.filtered[i].labels.length; j++){
        console.log(this.state.filtered[i].labels[j])
      }
    }
    this.setState({
      searchLabel:e.target.value
    })
    let currentContacts=this.state.contacts;
   
    let filteredContacts=[];
    if(e.target.value!=="" || e.target.value!==null ){
    filteredContacts=currentContacts.filter(contact=>{
      const lab = contact.labels;
      const searchlabel=e.target.value;
      return lab.includes(searchlabel);
    });
    this.setState({
      filtered:filteredContacts
    });
  }else{
    filteredContacts=this.state.contacts;
    this.setState({
      contacts: filteredContacts
    })
  }

    
  }

handleChange(e){
  let currentContacts=[];
  let filteredContacts=[];
  if(e.target.value!=="" || e.target.value!==null ){
    currentContacts=this.state.contacts;
    filteredContacts=currentContacts.filter(contact=>{

      const lc=contact.first_name.toLowerCase();
      const searchName=e.target.value.toLowerCase();
      return lc.includes(searchName);
    });
    this.setState({
      filtered:filteredContacts
    });
  }else{
    filteredContacts = this.state.contacts;
    this.setState({
      contacts: filteredContacts
    })
  }

  
  }


/** This function is passed to child component AddContact so that the addContact dialogue can be closed
 * and new contact returned here upon pushing to db*/ 
updateView =(newContact)=>{
  console.log("update view called")
  let a = this.state.contacts.slice();
  a.push(newContact)
  this.setState((state) => {
    return {contacts: a}
  });
}

/**This function is passed to child component UpdateContact so that when a contact is updated
 * we get fresh contacts from the db and render them
 */
updateView2=()=>{
  this.componentDidMount();
}

/**This function is passed to child component DeleteContact so that a contact can be deleted by id
 * and it can be removed from contactList state
 */
  deleteContact=(id)=>{
    delete_contact(id)

    this.setState({
      contacts:this.state.contacts.filter(el =>el._id !== id)
    })
    
  }

  
  /**This maps all current contacts into an accordian layout  */
  displayContactList=(contacts)=>{
    console.log(contacts)
    if(!contacts.length) return null;

    return contacts.map((contact, index)=>(
      <div key = {index} className ='contactListItem' style={{padding:'10px'}}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
      <Grid item xs={3}>
      <Typography className='first_name' style={{textAlign:'left'}}>{contact.first_name} {contact.last_name}</Typography>
        </Grid>
        <Grid item xs={3}>
            <Typography className='business' style={{textAlign:'left'}}>{contact.business}</Typography>
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

  render(
    // console.log(this.state.filtered)
  ){


      return(
        <div>
    <div className ='contactList' style={{display:"flex"}}>
      <Grid item xs={3}>
      <AddContactButton updateView ={this.updateView}/> 
      </Grid>
      <Grid item xs={3}>
        <ManageLabelButton/>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                 <InputLabel id="demo-simple-select-filled-label">Search by label</InputLabel>
                 <Select
                 labelId="demo-simple-select-filled-label"
                 id="demo-simple-select-filled"
                 value={this.label_id}
                 onChange={this.onChangeLabel}
                 >
                 <MenuItem value="">
                 <em>None</em>
                 </MenuItem>
                 {this.displayLabelDropdown(this.state.labels)}
                 </Select>
                 </FormControl>
        </Grid>
        </div>
        <input type="text" className="input" onChange={this.handleChange} placeholder="Search by first name" />
        
    {this.displayContactList(this.state.filtered)}
    {/* <Search items={this.state.contacts}/> */}
  </div>
     
      );
    }
}