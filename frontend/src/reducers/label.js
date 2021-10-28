const labelReducer = (labels = { labelData: [] }, action) => {


    switch (action.type) {
        case 'CREATE_LABEL':  
          return [ ...labels, action.payload ];
        case 'GET_ALL_LABEL':
          return action.payload;
        case 'DELETE_LABEL':
          return labels.filter((label)=>label._id !== action.payload);
        case 'GET_LABEL':
            return action.payload;
        default:
          return labels;
      }
    };

    export default labelReducer; 