const contactReducer = (contacts = { contactData: [] }, action) => {
    
  
  switch (action.type) {
      case 'CREATE':  
        return [ ...contacts, action.payload ];
      case 'GET_ALL':
        return action.payload;
      case 'DELETE':
        return contacts.filter((contact)=>contact._id !== contact.payload);
      default:
        return contacts;
    }
  };
  
  export default contactReducer;