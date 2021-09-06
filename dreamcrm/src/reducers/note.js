const noteReducer = (notes = [] , action) => {
    switch (action.type) {
      case 'CREATE':  
        return [...notes, action.payload];
      case 'GET_ALL':
        return action.payload;
      case 'UPDATE':
      return notes.map((note) => (note._id === action.payload._id ? action.payload : note));
      case 'DELETE':
        return notes.filter((note) => note._id !== action.payload);
      default:
        return notes;
    }
  };
  
  export default noteReducer;