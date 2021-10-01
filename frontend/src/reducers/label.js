const labelReducer = (labels = { labelData: [] }, action) => {


    switch (action.type) {
        case 'CREATE':  
          return [ ...labels, action.payload ];
        case 'GET_ALL':
          return action.payload;
        case 'DELETE':
          return labels.filter((label)=>label._id !== action.payload);
        case 'GET':
            return action.payload;
        default:
          return labels;
      }
    };

    export default labelReducer; 