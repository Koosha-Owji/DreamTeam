const noteReducer = (state = { noteData: null }, action) => {
    switch (action.type) {
      case 'CREATE':  
        return { ...state, noteData: action.payload };
      default:
        return state;
    }
  };
  
  export default noteReducer;