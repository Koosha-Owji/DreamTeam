/**
 * Meeting.js, takes each individual Meeting attribute and renders that information in the
 * appropriate format and position
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import Fab from "@material-ui/core/Fab";
import AddMeetingNote from "./AddMeetingNote";
// import Delete from '@material-ui/icons/DeleteForever'
import Update from "@material-ui/icons/Update";
import React from "react";
import "./meetings.css";
import DeleteMeeting from "./DeleteMeeting";
import MeetingCompleted from "./MeetingCompleted";

const Meeting = ({ meeting, setCurrentId }) => {
  var date_time;

  // converts the date into an Day Date format to be displayed
  const getDate1 = () => {
    date_time = new Date(meeting.date_time);
    return date_time.toDateString();
  };

  // converts the end time into an 12 hour format to be displayed
  const getEndTime = () => {
    var hours = new Date(meeting.date_time).getHours();
    var minutes = new Date(meeting.date_time).getMinutes();
    return getampm(hours, minutes);
  };

  // converts the start time into an 12 hour format to be displayed
  const getStartTime = (time) => {
    if (time) {
      const time_split = time.split(/(:)/);
      time_split.splice(1, 1);

      return getampm(parseInt(time_split[0]), parseInt(time_split[1]));
    }
  };

  // converts the hours and minutes into an 12 hour format to be displayed
  const getampm = (hours, minutes) => {
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const getAttendeesList = (attendeesList) => {
    if (attendeesList) {
      return attendeesList.map((attendee) => <p>{attendee}</p>);
    }
  };

  return (
    <div className="meetings">
      <ul>
        <li>
          <div className="boxes">
            <h2>{meeting.title}</h2>
            <p>{meeting.agenda}</p>
          </div>

          <div className="boxes">
            <p>{getDate1()}</p>
            <p>
              {getStartTime(meeting.time)} - {getEndTime()}
            </p>
          </div>

          <div className="boxes">
            <p>{getAttendeesList(meeting.contact_name)}</p>
            <p>{getAttendeesList(meeting.non_contact_attendees)}</p>
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
              <AddMeetingNote id={meeting._id} meeting_title1={meeting.title} />
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
          <div className="icon_boxes">
            <Fab
              color="primary"
              aria-label="delete"
              style={{ display: "flex" }}
            >
              <MeetingCompleted meeting={meeting} />
            </Fab>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Meeting;
