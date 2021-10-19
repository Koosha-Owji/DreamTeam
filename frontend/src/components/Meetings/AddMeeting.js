import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { createMeeting, updateMeeting } from "../../actions/meetings";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";

var new_contacts = [];

function AddMeeting({ handleSubmit, currentId, setCurrentId, contacts }) {
  const [meetingData, setMeetingData] = useState({
    title: "",
    agenda: "",
    non_contact_attendees: "",
    time: "",
    date: "",
    attendeeContact: "",
    contact_name: [],
    count: "",
    contact_id: [],
  });

  const dispatch = useDispatch();

  const meeting = useSelector((state) =>
    currentId ? state.meeting.find((n) => n._id === currentId) : null
  );

  const already_selected = [];
  // everytime someone clicks edit, change the add note to edit the current note
  useEffect(() => {
    if (meeting) {
      setMeetingData((meetingData) => ({
        ...meetingData,
        title: meeting.title,
        agenda: meeting.agenda,
        non_contact_attendees: meeting.non_contact_attendees.join(),
        time: meeting.time,
        date: meeting.date,
        // contact_name: meeting.contact_name,
        // contact_id: meeting.contact_id,
      }));
    }
  }, [currentId, meetingData.count, meeting]);

  // const checkAlready = () => {
  //   if (meeting) {
  //     if (already_selected.length < meetingData.contact_name.length) {
  //       if (meetingData.contact_name && meetingData.contact_id) {
  //         const len_name = meetingData.contact_name.length;
  //         const len_id = meetingData.contact_id.length;
  //         var i = 0;
  //         if (len_name === len_id) {
  //           for (i; i < len_name; i++) {
  //             already_selected.push({
  //               label: meetingData.contact_name[i],
  //               value: meetingData.contact_id[i],
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  // };
  // checkAlready();

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

  const animatedComponents = makeAnimated();

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

  const addContacts = (e) => {
    var contact_ids = [];
    var contact_names = [];

    e.reduce((acc, item) => {
      for (let key in item) {
        if (key === "value") {
          contact_ids.push(item[key]);
        }
        if (key === "label") {
          contact_names.push(item[key]);
        }
      }
      return contact_ids;
    }, []);

    setMeetingData({
      ...meetingData,
      contact_id: contact_ids,
      contact_name: contact_names,
    });
    console.log(meetingData.contact_name)
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={already_selected}
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
