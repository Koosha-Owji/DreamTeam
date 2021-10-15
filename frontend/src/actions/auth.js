import * as api from '../api/index.js';
export const signin = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: 'AUTH', data });
  
      router.push('/home');
    } catch (error) {
      alert("Invalid Credentials: Try Again!");
    }
  };
  
  export const signup = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
  
      dispatch({ type: 'AUTH', data });
  
      router.push('/home');
    } catch (error) {
      alert("Invalid Details: Try Again!");
    }
  };
