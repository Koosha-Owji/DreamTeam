import Meeting from './Meeting'
import "./meetings.css"

const MeetingList = ({meetings, setCurrentId}) => {
    return (
        !Array.isArray(meetings) ? "No More Meetings" :(

            // This statement should fix an empty meeting showing up after new meetings are added
            // once the date adding is fixed
            // !meetings.date !== "" ? "No More Meetings" :( 
 
                <div className = "meetingList">
                    {meetings.map((meeting) => (
                        <Meeting 
                            meeting = {meeting} 
                            setCurrentId = {setCurrentId}
                        />
                    ))}
                </div>
            // )
        )
    );
};

export default MeetingList