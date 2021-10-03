import Fab from '@material-ui/core/Fab';
import AddMeetingNote from './AddMeetingNote';
// import Delete from '@material-ui/icons/DeleteForever'
import Update from '@material-ui/icons/Update'
import React from 'react';
import "./meetings.css"
import DeleteMeeting from './DeleteMeeting';




const Meeting = ({meeting, setCurrentId}) => {
    var date_time;
    
    const getDate1 = () =>{
        date_time = new Date(meeting.date_time);
        return date_time.toDateString();
    }

    const getTime1 = () => {
       var hours = new Date(meeting.date_time).getHours();
       var minutes = new Date(meeting.date_time).getMinutes();
       var ampm = hours >= 12 ? "PM" : "AM";
       hours = hours % 12;
       hours = hours ? hours : 12; // the hour '0' should be '12'
       minutes = minutes < 10 ? "0" + minutes : minutes;
       var strTime = hours + ":" + minutes + " " + ampm;
        // date_time = new Date(meeting.date_time);
        // return date_time.toLocaleTimeString();
        // return date_time.toTimeString();
        return strTime;
    }
   
    return (
      <div className="meetings">
        <ul>
          <li>
            <div className="boxes">
              <h2>{meeting.title}</h2>
              <p>{meeting.agenda}</p>
            </div>

            <div className="boxes">
              <p>
                {/* {(meeting.date_time).getDate()}/{(meeting.date_time).getMonth()}/
                {(meeting.date_time).getYear()} */}
                {/* {(meeting.date_time).toDateString()} */}
                {}
                {getDate1()}
              </p>
              {/* <p>{meeting.date}</p> */}
              <p>
                {/* {meeting.date_time.getHours()}:{meeting.date_time.getMMinutes()} */}
                {getTime1()}
              </p>
              <p>{/* {meeting.date_time.toLocaleTimeString()} */}</p>
            </div>

            <div className="boxes">
              <p>{meeting.attendees}</p>
            </div>

            <div className="icon_box1">
              <Fab
                color="primary"
                aria-label="delete"
                style={{ display: "flex" }}
                onClick={() => setCurrentId(meeting._id)}
              >
                <Update />
              </Fab>
            </div>
            <div className="icon_boxes">
              <Fab
                color="primary"
                aria-label="delete"
                style={{ display: "flex" }}
              >
                <AddMeetingNote id={meeting._id} meeting_title1 = {meeting.title} />
              </Fab>
            </div>
            <div className="icon_boxes">
              <Fab
                color="primary"
                aria-label="delete"
                style={{ display: "flex" }}
              >
                <DeleteMeeting id={meeting._id} />
              </Fab>
            </div>
          </li>
        </ul>
      </div>
    );
};

export default Meeting