import * as api from '../api/index.js';


export const update_user = (user,router) => async(dispatch)=>{
    try {

      const {data} = await api.update_user(user);
      dispatch({type:'AUTH', data})

      router.go(0)
    } catch(err) {
      console.log(err.message);
    }
};