const noteReducer = (notes = [] , action) => {
    switch (action.type) {
      case 'CREATE_NOTE':  
        return [...notes, action.payload];
      case 'GET_ALL_NOTE':
        return action.payload;
      case 'UPDATE_NOTE':
      return notes.map((note) => (note._id === action.payload._id ? action.payload : note));
      case 'DELETE_NOTE':
        return notes.filter((note) => note._id !== action.payload);
      default:
        return notes;
    }
  };
  
  export default noteReducer;