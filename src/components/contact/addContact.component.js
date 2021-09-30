import React, { Component } from 'react';
//import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {create_contact} from '../../api/index'


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
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
        first_name: '',
        last_name: '',
        business: '',
        relationship: '',
        email_address:'', 
        phone_number:'', 
        description:''
        }
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
          description:this.state.description
        };
      
        console.log(contact);
        create_contact(contact);
        //axios.post('http://localhost:5000/contacts', contact)
        //.then(res => console.log(res.data));
      
        window.location = '/home';
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
      

  render() {
    
    return (
        <Container component="main" maxWidth="xs">
          <div>
        <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
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
                label="Email Address"
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
            <div className = 'note_footer'>
                <Button className = "Add to contacts" onClick={this.onSubmit}>Save</Button>
            </div>
      </div>
      </Container>
    );
  }
}