const emailReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'MAIL':
            return action.payload;
        default:
          return state;
    }
};
export default emailReducer;