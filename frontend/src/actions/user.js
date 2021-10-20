import * as api from "../api/index.js";

export const update_user = (user, router) => async (dispatch) => {
  try {
    const { data } = await api.update_user(user);
    dispatch({ type: "AUTH", data });
  } catch (err) {
    console.log(err.message);
  }
};
export const update_password = (passwordDetails) => async (dispatch) => {
  try {
    const { data } = await api.update_password(passwordDetails);
    dispatch({ type: "UPDATE_USER", data });
  } catch (error) {
    console.log(error.message);
  }
};
