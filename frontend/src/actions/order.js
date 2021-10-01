import * as api from '../api/index.js';

export const create_order = (order) => async (dispatch) => {
    try {
      const { data } = await api.create_order(order);

      dispatch({ type: 'CREATE', Payload: data });

      //router.push('/orders');
    } catch (error) {
      console.log(error);
    }
  };


export const get_all_orders = (orders) => async (dispatch) => {
  try {
    const { data } = await api.get_all_orders(orders);

    dispatch({ type: 'GET_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_order = (id) =>async (dispatch)=>{
  try{
    await api.delete_order(id);
    dispatch({type:'DELETE', payload:id});
  } catch(error){
    console.log(error.message);
  }
};

export const update_order = (id, order) => async(dispatch)=>{
  try{
    const {data} = await api.update_order(id, order);
    dispatch({type:'UPDATE', payload:data})
  }catch(error){
    console.log(error.message);
  }
}

export const get_order = (id)=>async(dispatch)=>{
  try {
    const { data } = await api.get_order(id);

    dispatch({ type: 'GET', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};