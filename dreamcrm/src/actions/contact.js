import * as api from '../api/index.js';

export const createContact = (userText, router) => async (dispatch) => {
    try {
      const { data } = await api.createContact(userText);
  
      dispatch({ type: 'CREATE', Payload: data });
  
      router.push('/contacts');
    } catch (error) {
      console.log(error);
    }
  };

  
export const getContacts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchContacts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};