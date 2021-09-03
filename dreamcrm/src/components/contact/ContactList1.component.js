import Contact from './Contact.component'

const ContactList = ({contacts}) => {
    return (
        
        <div className = "contactList">
            {contacts.map((contacts) => (
                <Contact first_name = {contacts.first_name} last_name= {contacts.last_name}
                    business = {contacts.business} description = {contacts.description}
                    email_address={contacts.email_address} phone_number={contacts.phone_number}/>
            ))}
            
        </div>

        
    );
}; 

export default ContactList
