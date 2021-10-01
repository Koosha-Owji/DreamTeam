import * as api from '../api/index.js';

export const create_label = (label) => async (dispatch) => {
    try {
      const { data } = await api.create_label(label);

      dispatch({ type: 'CREATE', Payload: data });

    } catch (error) {
      console.log(error);
    }
  };


export const get_all_labels = (labels) => async (dispatch) => {
  try {
    const { data } = await api.get_all_labels(labels);

    dispatch({ type: 'GET_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_label = (id) =>async (dispatch)=>{
  try{
    await api.delete_label(id);
    dispatch({type:'DELETE', payload:id});
  } catch(error){
    console.log(error.message);
  }
};

// export const update_label = (id, label) => async(dispatch)=>{
//   try{
//     const {data} = await api.update_label(id, label);
//     dispatch({type:'UPDATE', payload:data})
//   }catch(error){
//     console.log(error.message);
//   }
// }

export const get_label = (id)=>async(dispatch)=>{
  try {
    const { data } = await api.get_label(id);

    dispatch({ type: 'GET', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const get_labels_by_contact = (contact_id) => async (dispatch) => {
  try {
    const { data } = await api.get_labels_by_contact(contact_id)

    dispatch({ type: 'GET_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}; 