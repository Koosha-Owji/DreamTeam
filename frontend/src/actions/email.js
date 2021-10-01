import * as api from '../api/index.js';

export const sendEmail = (formData) => async (dispatch) => {
    try {
        const { data } = await api.sendEmail(formData);
        dispatch({ type: 'MAIL',  data });

    } catch (error) {
        console.log(error);
    }
}
export const linkEmail = (formData) => async (dispatch) => {
    try {
        const { data } = await api.linkEmail(formData);
        dispatch({type: 'LINK', payload: data});

    } catch (error) {
        console.log(error.message);
    }
}