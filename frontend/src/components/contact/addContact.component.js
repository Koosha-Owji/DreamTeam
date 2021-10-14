/**
 * addContact.component.js, front end component for adding a new contact
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {create_contact} from '../../api/index';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import {get_all_labels} from './../../api/index'

export default class AddContact extends Component {

    constructor(props) {
        super(props);

        this.onChangefirst_name = this.onChangefirst_name.bind(this);
        this.onChangelast_name = this.onChangelast_name.bind(this);
        this.onChangebusiness = this.onChangebusiness.bind(this);
        this.onChangerelationship= this.onChangerelationship.bind(this);
        this.onChangephone_number = this.onChangephone_number.bind(this);
        this.onChangeemail_address = this.onChangeemail_address.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangeLabel=this.onChangeLabel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        /**Function passed from contactList component to close dialogue once contact details are submitted in form*/
        this.closeDialogue= this.props.closeFromChild1;
      


        this.state = {
        first_name: '',
        last_name: '',
        business: '',
        relationship: '',
        email_address:'', 
        phone_number:'', 
        description:'',
        label_id:'',
        labels:[]
        }
      }

      /**Get all labels so a newly created contact can be assigned one*/
      componentDidMount() {
        get_all_labels()
          .then(response => {
            this.setState({ labels: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
      
      onSubmit(e) {
        e.preventDefault();

        const contact = {
          first_name:this.state.first_name,
          last_name:this.state.last_name, 
          business:this.state.business,
          relationship:this.state.relationship, 
          email_address:this.state.email_address,
          phone_number:this.state.phone_number,
          description:this.state.description,
          label_id:this.state.label_id
        };
        
        /**Post the new contact
         * Close the dialogue where we input contact details
         * Return the new contact to the parent component: contactList so it can be rendered*/
        create_contact(contact)
        .then(response=>this.closeDialogue(response.data))
        
      }

      onChangefirst_name(e) {
        this.setState({
          first_name: e.target.value
        });
      }
      onChangelast_name(e) {
        this.setState({
          last_name: e.target.value
        });
      }
      onChangebusiness(e) {
        this.setState({
          business: e.target.value
        });
      }
      onChangerelationship(e) {
        this.setState({
          relationship: e.target.value
        });
    }
    onChangephone_number(e) {
        this.setState({
          phone_number: e.target.value
        });
    }
    onChangedescription(e) {
        this.setState({
          description: e.target.value
        });
    }
    onChangeemail_address(e) {
        this.setState({
          email_address: e.target.value
        });
      
      }
      onChangeLabel(e){
        this.setState({
          label_id: e.target.value
        });
      }
      
      /**Display all possible labels that can be assigned to a newly created contact */
      displayLabelDropdown(labels){
        if(!labels.length) return null;
          return labels.map((label, index)=>(
            <MenuItem value={label._id} style={{backgroundColor:`${label.colour}`}}>{label.title}</MenuItem>
  
          ))
      }
      

  render() {
    /**We return a form with all fields required to add a new contact. 
     * Mandatory fields: first name and email are marked with a (*) */
    return (
        <Container component="main" maxWidth="xs">
          <div>
        <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First Name *"
                type="first_name"
                fullWidth
                value = {this.state.first_name}
                onChange={this.onChangefirst_name}
            ></TextField>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Last Name"
                type="last_name"
                fullWidth
                value = {this.state.last_name}
                onChange={this.onChangelast_name}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Business"
                type="business"
                fullWidth
                value = {this.state.business}
                onChange={this.onChangebusiness}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Relationship"
                type="relationship"
                fullWidth
                value = {this.state.relationship}
                onChange={this.onChangerelationship}
            ></TextField>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address *"
                type="email"
                fullWidth
                value = {this.state.email_address}
                onChange={this.onChangeemail_address}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Phone number"
                type="phone_number"
                fullWidth
                value = {this.state.phone_number}
                onChange={this.onChangephone_number}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Description"
                type="description"
                fullWidth
                value = {this.state.description}
                onChange={this.onChangedescription}
            ></TextField>
             <Typography variant="h6">Label this contact </Typography>

                <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">Label</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={this.state.label_id}
                onChange={this.onChangeLabel}
                >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                {this.displayLabelDropdown(this.state.labels)}
                </Select>
                </FormControl>
            <div className = 'note_footer'>
                <Button className = "Add to contacts" onClick={this.onSubmit}>Save</Button>
            </div>
      </div>
      </Container>
    );
  }
}