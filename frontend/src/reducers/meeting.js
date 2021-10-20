const meetingReducer = (meetings = [] , action) => {
    switch (action.type) {
      case 'CREATE_MEETING':  
        return [...meetings, action.payload];
      case 'GET_ALL_MEETING':
        return action.payload;
      case 'UPDATE_MEETING':
      return meetings.map((meeting) => (meeting._id === action.payload._id ? action.payload : meeting));
      case 'DELETE_MEETING':
        return meetings.filter((meeting) => meeting._id !== action.payload);
      default:
        return meetings;
    }
  };
  
  export default meetingReducer;