import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
// import InputAdornment from "@mui/material/InputAdornment";
// import { createMeeting, updateMeeting } from "../../actions/meetings";
import { useDispatch } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { create_contact } from "../../actions/contact";


function AddMeeting({ handleSubmit, labels}) {
    console.log(labels)
  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    business: "",
    relationship: "",
    email_address: "",
    phone_number: "",
    description: "",
    label_id: "",
    labels: [],
  });

  const dispatch = useDispatch();

  const handleSaveClick = (e) => {
    e.preventDefault();

    if (
      contactData.first_name.trim().length > 0 &
      contactData.email_address.trim().length > 0
    ) {
      // send the relevant dispatch call;
        dispatch(create_contact(contactData));
      }
      handleSubmit();
    }
  

  // everytime someone clicks edit, change the add note to edit the current note

  const animatedComponents = makeAnimated();

  const addLabels = (e) => {
    var labels_names_ids = e;

    setContactData({
      ...contactData,
      labels: labels_names_ids,
    });
  };

  const labelOptions =()=>{
    let options =[];
    if(labels.length>0){
    labels.map(item=>options.push({label:item.title, value:item}))
    }
    return options;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          label="Contacts"
          value={contactData.labels}
          isMulti
          options={labelOptions()}
          onChange={addLabels}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="First Name*"
          type="meeting_title"
          fullWidth
          value={contactData.first_name}
          onChange={(e) =>
            setContactData({ ...contactData, first_name: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Last Name"
          type="meeting_agenda"
          fullWidth
          value={contactData.last_name}
          onChange={(e) =>
            setContactData({ ...contactData, last_name: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Business"
          type="contacts"
          fullWidth
          value={contactData.business}
          onChange={(e) =>
            setContactData({
              ...contactData,
              business: e.target.value,
            })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Relationship"
          fullWidth
          value={contactData.relationship}
          onChange={(e) =>
            setContactData({ ...contactData, relationship: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email*"
          fullWidth
          value={contactData.email_address}
          onChange={(e) =>
            setContactData({ ...contactData, email_address: e.target.value })
          }
        ></TextField>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Phone"
          fullWidth
          placeholder="End Time"
          value={contactData.phone_number}
          onChange={(e) =>
            setContactData({ ...contactData, phone_number: e.target.value })
          }
        ></TextField>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Description"
          fullWidth
          placeholder="End Time"
          value={contactData.description}
          onChange={(e) =>
            setContactData({ ...contactData, description: e.target.value })
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
