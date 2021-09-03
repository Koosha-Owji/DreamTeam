const contactReducer = (contacts = { contactData: [] }, action) => {
    
  
  switch (action.type) {
      case 'CREATE':  
        return [ ...contacts, action.payload ];
      case 'GET_ALL':
        return action.payload;
      default:
        return contacts;
    }
  };
  
  export default contactReducer;