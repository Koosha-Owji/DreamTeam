import * as api from '../api/index.js';

export const createMeeting = (userText) => async (dispatch) => {
    try {
      const { data } = await api.createMeeting(userText);
      
      dispatch({ type: 'CREATE_MEETING', payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };
export const getAllMeetings = () => async (dispatch) => {
  try {
    const { data } = await api.getAllMeetings();
    dispatch({type: 'GET_ALL_MEETING', payload: data})
    
  } catch (error) {
    console.log(error);
  }
};

export const updateMeeting = (id, meeting) => async (dispatch) => {
  try {
    const { data } = await api.updateMeeting(id, meeting);

    dispatch({ type: 'UPDATE_MEETING', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const markCompleted = (id, meeting) => async (dispatch) => {
  try {
    const { data } = await api.markCompleted(id, meeting);

    dispatch({ type: "UPDATE_MEETING", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMeeting = (id) => async (dispatch) => {
  try {
    await api.deleteMeeting(id);

    dispatch({ type: 'DELETE_MEETING', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};