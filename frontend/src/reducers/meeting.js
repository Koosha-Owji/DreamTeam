const meetingReducer = (meetings = [] , action) => {
    switch (action.type) {
      case 'CREATE':  
        return [...meetings, action.payload];
      case 'GET_ALL':
        return action.payload;
      case 'UPDATE':
      return meetings.map((meeting) => (meeting._id === action.payload._id ? action.payload : meeting));
      case 'DELETE':
        return meetings.filter((meeting) => meeting._id !== action.payload);
      default:
        return meetings;
    }
  };
  
  export default meetingReducer;