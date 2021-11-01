/**
 * MeetingList.js, takes meetings component and the required fucntions from the MeetingPage, and sends individual
 * meetings to the Meeting function
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import Meeting from "./Meeting";
import "./meetings.css";

const MeetingList = ({ meetings, setCurrentId }) => {
  return !Array.isArray(meetings) ? (
    <tr>You have No Meeting! Create one by clicking the Add Button</tr>
  ) : (
    <div className="meetingList">
      {meetings.map((meeting) => (
        <Meeting meeting={meeting} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default MeetingList;
