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
