const noteReducer = (notes = [] , action) => {
    switch (action.type) {
      case 'CREATE':  
        return [...notes, action.payload];
      case 'GET_ALL':
        return action.payload;
      default:
        return notes;
    }
  };
  
  export default noteReducer;