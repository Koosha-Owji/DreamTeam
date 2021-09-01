import * as api from '../api/index.js';

export const createNote = (userText, router) => async (dispatch) => {
    try {
      const { data } = await api.createNote(userText);
  
      dispatch({ type: 'CREATE', payload: data });
  
      router.push('/user/notes');
    } catch (error) {
      console.log(error);
    }
  };
export const get_allNotes = (initial_state) => async (dispatch) => {
  try {
    const { data } = await api.get_allNotes(initial_state);
    dispatch({type: 'GET_ALL', payload: data})
    
  } catch (error) {
    console.log(error);
  }
};