/**
 *  AddOrder.component.js, front end component for adding a new order
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
 import React, { Component } from 'react';
 import TextField from '@material-ui/core/TextField';
 import Button from '@material-ui/core/Button';
 import Container from '@material-ui/core/Container';
 import InputLabel from '@material-ui/core/InputLabel';
 import MenuItem from '@material-ui/core/MenuItem';
 import FormControl from '@material-ui/core/FormControl';
 import Select from '@material-ui/core/Select';
 import { Typography } from '@material-ui/core';
 import { get_all_contacts, create_order } from '../../api/index';
 
 

 export default class AddOrder extends Component {
 
        constructor(props){
            super(props);
            this.onChangeContact=this.onChangeContact.bind(this);
            this.onChangeProduct=this.onChangeProduct.bind(this);
            this.onChangeStage=this.onChangeStage.bind(this);
            this.onChangeAmount=this.onChangeAmount.bind(this);
            this.onChangeDueDate=this.onChangeDueDate.bind(this);
            this.onChangeStartDate=this.onChangeStartDate.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

            /**Function passed from contactList component to close dialogue once contact details are submitted in form*/
            this.closeDialogue= this.props.closeFromChild;
            this.state = {
                contacts:[],
                contact_id:'',
                product:'',
                stage:'',
                amount:'',
                dueDate:'',
                startDate:''
              };
        
            }
    
       /**Get all current contacts so one can be selected to be assigned to an order */     
       componentDidMount() {
         get_all_contacts()
           .then(response => {
             this.setState({ contacts: response.data })
           })
           .catch((error) => {
             console.log(error);
           })
       }
       
       onSubmit(e) {
         e.preventDefault();
         const order={
             contact_id:this.state.contact_id,
             product:this.state.product,
             amount :this.state.amount,
             stage :this.state.stage,
             dueDate :this.state.dueDate,
             startDate:this.state.startDate
         }
         /**Send post request of new order to back end
          * return the created order to parent component: OrderList to be rendered
          * Dialogue closes on new order return
          */
         create_order(order)
         .then(response=>this.closeDialogue(response.data))
         
       }

       onChangeProduct(e) {
        this.setState({
          product: e.target.value
        });
      }

      onChangeAmount(e) {
        this.setState({
          amount: e.target.value
        });
      }

      onChangeStage(e) {
        this.setState({
          stage: e.target.value
        });
      }
      onChangeDueDate(e) {
        this.setState({
          dueDate: e.target.value
        });
      }
      onChangeStartDate(e) {
        this.setState({
          startDate: e.target.value
        });
      }
      
       onChangeContact(e){
        this.setState({
            contact_id: e.target.value
          });
       }
   
       /**Display dropdown of contacts, select one to assign to an order */
       displayContactDropdown(contacts){
         if(!contacts.length) return null;
           return contacts.map((contact, index)=>(
             <MenuItem value={contact._id} >{contact.first_name}{contact.last_name}</MenuItem>
   
           ))
       }
       
 
   render() {
     
     return (
         <Container component="main" maxWidth="xs">
           <div>
 
                 {/* <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                 <InputLabel id="demo-simple-select-filled-label">Assign to contact</InputLabel> */}
                 {/* <Select labelId="demo-simple-select-filled-label"
                 id="demo-simple-select-filled"
                 value={this.state.contact_id}
                 onChange={this.onChangeContact}
                 >
                 <MenuItem value="">
                 <em>None</em>
                 </MenuItem> */}
                 {/* {this.displayContactDropdown(this.state.contacts)}
                 </Select> */}
                 {/* </FormControl> */}
                 <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Contact"
                type="contact"
                fullWidth
                value = {this.state.contact_id}
                onChange={this.onChangeContact}
            ></TextField>

                 <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Product *"
                type="product"
                fullWidth
                value = {this.state.product}
                onChange={this.onChangeProduct}
            ></TextField>

                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Amount"
                type="amount"
                fullWidth
                value = {this.state.amount}
                onChange={this.onChangeAmount}
            ></TextField>
            <Typography variant="caption"> Start Date</Typography>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                type="date"
                fullWidth
                value = {this.state.startDate}
                onChange={this.onChangeStartDate}
            ></TextField>
            <Typography variant="caption"> Due Date</Typography>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                type="date"
                fullWidth
                value = {this.state.dueDate}
                onChange={this.onChangeDueDate}
            ></TextField>


            <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Order Status</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={this.state.stage}
            onChange={this.onChangeStage}
            >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Ordered"} >Ordered</MenuItem>
          <MenuItem value={"Delivered"} >Delivered</MenuItem>
          <MenuItem value={"Completed"} >Completed</MenuItem>
        </Select>
      </FormControl>
             <div className = 'note_footer'>
                 <Button className = "assign label" onClick={this.onSubmit}>Confirm Order</Button>
             </div>
       </div>
       </Container>
     );
   }
 }