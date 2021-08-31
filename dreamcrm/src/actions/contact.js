import * as api from '../api/index.js';

export const create_contact = (contact) => async (dispatch) => {
    try {
      const { data } = await api.create_contact(contact);
  
      dispatch({ type: 'CREATE', Payload: data });
  
      router.push('/contacts');
    } catch (error) {
      console.log(error);
    }
  };

  
export const get_all_contacts = () => async (dispatch) => {
  try {
    const { data } = await api.get_all_contacts();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};