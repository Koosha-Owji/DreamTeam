/**
 * AddMeeting.js, pop up for the users to input the meeting information when creating a new meeting
 * Additionally, when updating a meeting the pop up is prefilled with the meeting information
 * which the user can update
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputAdornment from "@mui/material/InputAdornment";
import { createMeeting, updateMeeting } from "../../actions/meetings";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";

var new_contacts = [];

function AddMeeting({ handleSubmit, currentId, setCurrentId, contacts }) {
  // Form data
  const [meetingData, setMeetingData] = useState({
    title: "",
    agenda: "",
    non_contact_attendees: "",
    time: "",
    date: "",
    endtime: "",
    attendeeContact: "",
    contact_name: [],
    count: "",
    contact_name_id: [],
  });

  const dispatch = useDispatch();

  // If this meeting already exists, retrieve the information
  const meeting = useSelector((state) =>
    currentId ? state.meeting.find((n) => n._id === currentId) : null
  );

  // everytime someone clicks edit, change the add meeting pop up to edit the selected meeting
  useEffect(() => {
    if (meeting) {
      setMeetingData((meetingData) => ({
        ...meetingData,
        title: meeting.title,
        agenda: meeting.agenda,
        non_contact_attendees: meeting.non_contact_attendees.join(),
        time: meeting.time,
        date: meeting.date,
        contact_name: meeting.contact_name,
        contact_name_id: meeting.contact_name_id,
        endtime: meeting.endtime,
      }));
    }
  }, [currentId, meetingData.count, meeting]);

  /**
   * Everytime the Save button is clicked, this function checks the currentId to deduce whether the meeting is edited or saved
   * and then performs the appropriate actions on it
   * @param {the event that occured, i.e clicking the save button} event
   */
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

  // creates the animation when assigning a contact to a meeting
  const animatedComponents = makeAnimated();

  /**
   * Creates a new contacts list with appropriate formatting for the Contact Dropdown to display
   */
  const fixContacts = () => {
    contacts.map((contact) => {
      if (new_contacts.length < contacts.length) {
        new_contacts.push({
          label: contact.first_name + " " + contact.last_name,
          value: contact._id,
        });
      }
      return null;
    });
  };
  fixContacts();

  /**
   * Everytime a contact is added to a meeting, this function updates the meetingData information with 
   * newly added contact
   * @param {the event that occured, i.e clicking the add button} event
   */
  const addContacts = (e) => {
    var contact_names_ids = e;
    var contact_names = [];

    e.reduce((acc, item) => {
      for (let key in item) {
        if (key === "label") {
          contact_names.push(item[key]);
        }
      }
      return contact_names;
    }, []);

    setMeetingData({
      ...meetingData,
      contact_name_id: contact_names_ids,
      contact_name: contact_names,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          label="Contacts"
          value={meetingData.contact_name_id}
          isMulti
          options={new_contacts}
          onChange={addContacts}
        />
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
          label="Attendees (Name 1, Name 2)"
          type="contacts"
          fullWidth
          value={meetingData.non_contact_attendees}
          onChange={(e) =>
            setMeetingData({
              ...meetingData,
              non_contact_attendees: e.target.value,
            })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Date*"
          type="date"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"> </InputAdornment>,
          }}
          value={meetingData.date}
          onChange={(e) =>
            setMeetingData({ ...meetingData, date: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Start Time*"
          type="time"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"> </InputAdornment>,
          }}
          value={meetingData.time}
          onChange={(e) =>
            setMeetingData({ ...meetingData, time: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="End Time*"
          type="time"
          fullWidth
          placeholder="End Time"
          InputProps={{
            startAdornment: <InputAdornment position="start"> </InputAdornment>,
          }}
          value={meetingData.endtime}
          onChange={(e) =>
            setMeetingData({ ...meetingData, endtime: e.target.value })
          }
        ></TextField>

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
