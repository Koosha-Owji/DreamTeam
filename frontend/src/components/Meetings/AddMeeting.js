import React, { useState, useEffect } from "react";
//import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { createMeeting, updateMeeting } from "../../actions/meetings";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { get_all_contacts } from "./../../api/index";

function AddMeeting({ handleSubmit, currentId, setCurrentId }) {
  const [meetingData, setMeetingData] = useState({
    title: "",
    agenda: "",
    attendees: "",
    time: "",
    date: "",
    attendeeContact: "",
    Contacts: [],
  });
  const dispatch = useDispatch();

  const meeting = useSelector((state) =>
    currentId ? state.meeting.find((n) => n._id === currentId) : null
  );

  // everytime someone clicks edit, change the add note to edit the current note
  useEffect(() => {
    if (meeting) {
      setMeetingData({
        ...meetingData,
        title: meeting.title,
        agenda: meeting.agenda,
        attendees: meeting.attendees,
        time: meeting.time,
        date: meeting.date,
      });
    }
  }, [currentId]);

  const handleSaveClick = (e) => {
    e.preventDefault();

    if (
      meetingData.title.trim().length > 0 &&
      meetingData.date.trim().length > 0 &&
      meetingData.time.trim().length > 0
    ) {
      // send the relevant dispatch call;
      if (currentId) {
        dispatch(updateMeeting(currentId, meetingData));
      }

      // IF ITS A NEW MEETING BEING ADDED
      else {
        dispatch(createMeeting(meetingData));
      }

      handleSubmit();
    }
  };

  const handleContacts = () => {
    get_all_contacts()
      .then((response) => {
        this.setMeetingData({ Contacts: response.data });
      })
      .then(console.log("Contacts received"))
      .catch((error) => {
        console.log(error);
      });
  };

  const displayLabelDropdown = () => {
    handleContacts();
    if (!meetingData.Contacts.length) return null;
    return meetingData.Contacts.map((label, index) => (
      <MenuItem
        value={label._id}
        style={{ backgroundColor: `${label.colour}` }}
      >
        {label.title}
      </MenuItem>
    ));
  };

  handleContacts();

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title*"
          type="meeting_title"
          fullWidth
          value={meetingData.title}
          onChange={(e) =>
            setMeetingData({ ...meetingData, title: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Agenda"
          type="meeting_agenda"
          fullWidth
          value={meetingData.agenda}
          onChange={(e) =>
            setMeetingData({ ...meetingData, agenda: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Attendees"
          type="contacts"
          fullWidth
          value={meetingData.attendees}
          onChange={(e) =>
            setMeetingData({ ...meetingData, attendees: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=" "
          type="time"
          fullWidth
          value={meetingData.time}
          onChange={(e) =>
            setMeetingData({ ...meetingData, time: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=" "
          type="date"
          fullWidth
          value={meetingData.date}
          onChange={(e) =>
            setMeetingData({ ...meetingData, date: e.target.value })
          }
        ></TextField>
        {handleContacts}
        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Label</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={meetingData.attendeeContact}
            onChange={(e) =>
              setMeetingData({
                ...meetingData,
                attendeeContact: e.target.value,
              })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {displayLabelDropdown()}
          </Select>
        </FormControl>

        <div className="note_footer">
          <Button className="Add to contacts" onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      </div>
    </Container>
  );
}
export default AddMeeting;
