const contactReducer = (contacts = { contactData: [] }, action) => {
    
  
  switch (action.type) {
      case 'CREATE':  
        return [ ...contacts, action.payload ];
      case 'GET_ALL':
        return action.payload;
      case 'DELETE':
        return contacts.filter((contact)=>contact._id !== action.payload);
      case 'UPDATE':
          return contacts.map((contact)=>(contact._id === action.payload._id ? action.payload :contact))
      default:
        return contacts;
    }
  };
  
  export default contactReducer;