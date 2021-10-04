import React, { useEffect } from "react";
import "./meetings.css";
// import { nanoid } from "nanoid";

import MeetingList from "./MeetingList";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import AddMeeting from "./AddMeeting.js";

import { useDispatch, useSelector } from "react-redux";
import { getAllMeetings } from "../../actions/meetings";

function MeetingPage() {
  const dispatch = useDispatch();
  // Notes from database will go here

  // UPCOMING AND PAST
  // can possibly traverse through meetingList and then check if the date and time is in past or not and then
  // can send the appropriate list to the MeetingsList
  var meetingList1 = [];
  var sortedMeetings = [];

  const meetingsList = useSelector((state) => state.meeting);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(getAllMeetings());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId("");
  };

  const handleSubmit = () => {
    handleClose();
    // console.log("Handle Submit")
    // setOpen(false);
    dispatch(getAllMeetings());
  };

  const [currentId, setCurrentId] = React.useState(null);

  const meeting = useSelector((state) =>
    currentId ? state.meeting.find((n) => n._id === currentId) : null
  );

  // everytime someone clicks edit, change the add note to edit the current note
  useEffect(() => {
    if (meeting) {
      handleClickOpen();
    }
    // console.log("CurrentID changed");
  }, [currentId,meeting]);

  const [meetingType, setMeetingType] = React.useState("upcoming");
  const handleMeetingTypeChange = (event, meetingType) => {
    setMeetingType(meetingType);
  };

  const setMeetingList = (meetingType) => {
    const current = new Date();
    current.setSeconds(59);

    if (meetingType === "upcoming") {
      meetingsList.forEach((element) => {
        if (current <= new Date(element.date_time)) {
          meetingList1.push(element);
        }
      });
      sortedMeetings = meetingList1
        .slice()
        .sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
    }

    if (meetingType === "past") {
      meetingsList.forEach((element) => {
        if (current > new Date(element.date_time)) {
          meetingList1.push(element);
        }
      });
      sortedMeetings = meetingList1
        .slice()
        .sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
    }
  };

  setMeetingList(meetingType);
  return (
    <div className="container">
      <ToggleButtonGroup
        color="primary"
        value={meetingType}
        // fullWidth
        exclusive
        onChange={handleMeetingTypeChange}
        fullWidth
        size="medium"
        sx={{
          border: 0.5,
          // bgcolor: '#cccccc',
          // color: 'primary',
          borderRadius: 4,
          boxShadow: 2,
          borderColor: "#5a6abf",
        }}
      >
        <ToggleButton value="upcoming">Upcoming</ToggleButton>
        <ToggleButton value="past">Past</ToggleButton>
      </ToggleButtonGroup>

      <div className="addMeeting">
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          onClick={handleClickOpen}
        >
          <AddIcon className="extendedIcon" />
          Add New Meeting
        </Fab>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Meeting Details</DialogTitle>
          <AddMeeting
            handleSubmit={handleSubmit}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        </Dialog>
      </div>
      <div className="meeting_container">
        <MeetingList meetings={sortedMeetings} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
}

export default MeetingPage;
