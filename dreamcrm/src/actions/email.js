import * as api from '../api/index.js';

export const sendEmail = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.sendEmail(formData);
        dispatch({ type: 'MAIL', payload: data });

    } catch (error) {
        console.log(error);
    }
}