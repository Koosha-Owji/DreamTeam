import * as api from '../api/index.js';

export const createNote = (userText, router) => async (dispatch) => {
    try {
      const { data } = await api.createNote(userText);
  
      dispatch({ type: 'CREATE', Payload: data });
  
      router.push('/user/notes');
    } catch (error) {
      console.log(error);
    }
  };