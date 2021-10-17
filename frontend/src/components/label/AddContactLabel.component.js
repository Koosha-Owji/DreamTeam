/**
 * addContact.component.js, front end component for adding a new contact
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
 import React, { Component } from 'react';
 import Button from '@material-ui/core/Button';
 import Container from '@material-ui/core/Container';
 import InputLabel from '@material-ui/core/InputLabel';
 import MenuItem from '@material-ui/core/MenuItem';
 import FormControl from '@material-ui/core/FormControl';
 import Select from '@material-ui/core/Select';
 import {get_all_labels, add_contact_label} from './../../api/index';
 
 

 export default class AddContactLabel extends Component {
 
        constructor(props){
            super(props);
            this.onChangeLabel=this.onChangeLabel.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.state = {
                labels:[],
                label_id:''
              };
            this.contact_id=this.props.contact_id;
            this.updateView=this.props.updateView;
        
            }
    /**Get all labels that currently exist so we can select one to assign to the contact */
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
         if(e!==""){
         e.preventDefault();
         add_contact_label(this.state.label_id, this.contact_id)
         .then(response=>{
          this.updateView(response.data)})
        .catch(err=>console.log(err))
         }
       }
 
      
       onChangeLabel(e){
         this.setState({
           label_id:e.target.value
         })
         
       }
       
       /**Display labels in a dropdown from which we can select one to assign to a contact */
       displayLabelDropdown(labels){
         if(!labels.length) return null;
           return labels.map((label, index)=>(
             <MenuItem value={label._id} style={{backgroundColor:`${label.colour}`}}>{label.title}</MenuItem>
   
           ))
       }
       
 
   render() {
     
     return (
         <Container component="main" maxWidth="xs">
           <div>
 
                 <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                 <InputLabel id="demo-simple-select-filled-label">Add new label</InputLabel>
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
             <div className = 'note_footer'>
                 <Button className = "assign label" onClick={this.onSubmit}>Confirm</Button>
             </div>
       </div>
       </Container>
     );
   }
 }