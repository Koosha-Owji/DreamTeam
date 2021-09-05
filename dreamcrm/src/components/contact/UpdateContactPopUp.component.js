import React, { Component } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';



export default class UpdateContactPopUp extends Component {

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
        description:'',
        }
      }
    //   +this.props.match.params._id
      componentDidMount() {
        axios.get('http://localhost:5000/contacts/'+this.props.setData)
          .then(console.log(this.props.setData))
          .then(response => {
            this.setState({
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              business:response.data.business,
              phone_number:response.data.phone_number,
              email_address:response.data.email_address,
              relationship:response.data.relationship,
              description: response.data.description,
            })   
          })
          .catch(function (error) {
            console.log(error);
          })

          // window.location = '/contacts';
    
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
        axios.post('http://localhost:5000/contacts/update/'+this.props.setData, contact)
        .then(res => console.log(res.data));
      
        window.location = '/contacts';
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
                <Button className = "Update Contact" onClick={this.onSubmit}>Save</Button>
            </div>
      </div>
      </Container>
    );
  }
}