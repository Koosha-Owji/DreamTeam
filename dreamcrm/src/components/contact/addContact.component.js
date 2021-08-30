import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {creatdContact} from "../actionsdContacts";

const intial_state = {
    first_name: '',
    last_name: '',
    business: '',
    relationship: '',
    email_address:'', 
    phone_number:'', 
    description:''
}

const AddContact = ({handleAddContact}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    const [ContactDetails, setContactDetails] = useState({
        intial_state
    });

    const handleChange = (event) => {
        const value = event.target.value
        console.log(event.target.name);
        setContactDetails({
            ...ContactDetails,
            [event.target.name]: value
        });
    }

    const handleSaveClick = (event) => {
        if (ContactDetails.last_name.trim().length > 0){
            //handleAddContactText);
            event.preventDefault();
            dispatch(createContactDetails, history);
            setContactDetails({
                ...ContactDetails,
                first_name: '',
                last_name: '',
                business: '',
                relationship: '',
                email_address:'', 
                phone_number:'', 
                description:''
            });
        }
    };

    return (
        <div className = "contact new" >
            <textarea
                rows = '2'
                cols ='10'
                placeholder = 'First Name' 
                name = "first name"
                value = {noteText.first_name}
                onChange={handleChange}
            ></textarea>
            <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Last Name' 
                name = "last name"
                value = {noteText.last_name}
                onChange={handleChange}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Business' 
                name = "business"
                value = {noteText.business}
                onChange={handleChange}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Relationship' 
                name = "last_name"
                value = {noteText.relationship}
                onChange={handleChange}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Phone Number' 
                name = "phone number"
                value = {noteText.phone_number}
                onChange={handleChange}
            ></textarea>
             <textarea
                rows = '8'
                cols ='10'
                placeholder = 'Description' 
                name = "description"
                value = {noteText.description}
                onChange={handleChange}
            ></textarea>
            <div className = 'note_footer'>
                <small>New Note</small>
                <button className = "save" onClick={handleSaveClick}>Save</button>
            </div>
    
        </div>)
    }
    
    export default AddContact;