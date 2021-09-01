import React, { Component } from 'react';
import axios from 'axios';

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
        axios.post('http://localhost:5000/contacts', contact)
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
      <div>
        <textarea
                rows = '8'
                cols ='10'
                placeholder = 'First Name' 
                name = "first name"
                value = {this.state.first_name}
                onChange={this.onChangefirst_name}
            ></textarea>
            <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Last Name' 
                name = "last name"
                value = {this.state.last_name}
                onChange={this.onChangelast_name}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Business' 
                name = "business"
                value = {this.state.business}
                onChange={this.onChangebusiness}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Relationship' 
                name = "last_name"
                value = {this.state.relationship}
                onChange={this.onChangerelationship}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Phone Number' 
                name = "phone number"
                value = {this.state.phone_number}
                onChange={this.onChangephone_number}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Description' 
                name = "description"
                value = {this.state.description}
                onChange={this.onChangedescription}
            ></textarea>
            <div className = 'note_footer'>
                <small>New Note</small>
                <button className = "save" onClick={this.onSubmit}>Save</button>
            </div>
      </div>
    )
  }
}