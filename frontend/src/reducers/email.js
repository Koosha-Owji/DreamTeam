const emailReducer = (email = { emailData: null }, action) => {
    switch (action.type) {
        case 'MAIL':
            return {...email, emailData: action.data};
        case 'LINK':
            return action.payload;
        default:
          return email;
    }
};
export default emailReducer;