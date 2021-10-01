/**
 * contact.js, middleware functions for contact (get, get all, update, delete, create)
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import * as api from '../api/index.js';

export const create_contact = (contact) => async (dispatch) => {
    try {
      const { data } = await api.create_contact(contact);
  
      dispatch({ type: 'CREATE', Payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };

  
export const get_all_contacts = (contacts) => async (dispatch) => {
  try {
    const { data } = await api.get_all_contacts(contacts);

    dispatch({ type: 'GET_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_contact = (id) =>async (dispatch)=>{
  try{
    await api.delete_contact(id);
    dispatch({type:'DELETE', payload:id});
  } catch(error){
    console.log(error.message);
  }
};

export const update_contact = (id, contact) => async(dispatch)=>{
  try{
    const {data} = await api.update_contact(id, contact);
    dispatch({type:'UPDATE', payload:data})
  }catch(error){
    console.log(error.message);
  }
}

export const get_contact = (id)=>async(dispatch)=>{
  try {
    const { data } = await api.get_contact(id);

    dispatch({ type: 'GET', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};