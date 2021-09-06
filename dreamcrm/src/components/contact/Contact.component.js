

const Contact = ({first_name, last_name, business, relationship
, phone_number, email_address, description}) => {
   
    return (
        <div className = 'contact'>
            <h2>{first_name}</h2>
            <textarea rows = '10'>{business}</textarea>
                <small>{description}</small>
                <small>{phone_number}</small>
            
        </div>
    );

};


export default Contact;