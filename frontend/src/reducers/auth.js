const authReducer = (state = { authData: null,password_Changed: null }, action) => {
    switch (action.type) {
      case 'AUTH':
        localStorage.clear();
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
  
        return { ...state, authData: action.data, errors: null };
      case 'LOGOUT':
        localStorage.clear();
  
        return { ...state, authData: null, errors: null };
      case 'UPDATE_USER':
        return {...state,password_Changed:action.data};
      default:
        return state;
    }
  };
  
  export default authReducer;