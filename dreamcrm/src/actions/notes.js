import * as api from '../api/index.js';

export const createNote = (userText) => async (dispatch) => {
    try {
      const { data } = await api.createNote(userText);
  
      dispatch({ type: 'CREATE', payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };
export const get_allNotes = () => async (dispatch) => {
  try {
    const { data } = await api.get_allNotes();
    dispatch({type: 'GET_ALL', payload: data})
    
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = (id, note) => async (dispatch) => {
  try {
    const { data } = await api.updateNote(id, note);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    await api.deleteNote(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};