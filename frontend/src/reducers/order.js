const orderReducer = (orders = { orderData: [] }, action) => {


    switch (action.type) {
        case 'CREATE':  
          return [ ...orders, action.payload ];
        case 'GET_ALL':
          return action.payload;
        case 'DELETE':
          return orders.filter((order)=>order._id !== action.payload);
        case 'UPDATE':
            return orders.map((order)=>(order._id === action.payload._id ? action.payload :order));
        case 'GET':
            return action.payload;
        default:
          return orders;
      }
    };

    export default orderReducer;