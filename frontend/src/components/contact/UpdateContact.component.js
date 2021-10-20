/**
 * updateContact.component.js, component for updating a contact
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import Fab from '@material-ui/core/Fab';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Select from "react-select";
import makeAnimated from "react-select/animated";


import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { update_contact } from '../../actions/contact'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: theme.spacing(1),
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    }
  }));
  
  
    const  UpdateContact=({currId, allContacts, new_labels})=> {
      const dispatch = useDispatch();
    const classes = useStyles();

    const [contactDetails, setContactDetails]=useState({
    first_name: '',
    last_name: '',
    business: '',
    relationship: '',
    email_address:'', 
    phone_number:'', 
    description:'',
    count:''
    });

    const contact = useSelector((state) => currId ? allContacts.find((n) => n._id === currId) : null);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (contact){
        setContactDetails(contactDetails=>({
            ...contactDetails,
            first_name:contact.first_name, 
            last_name:contact.last_name,
            business:contact.business,
            relationship:contact.relationship, 
            phone_number: contact.phone_number,
            email_address:contact.email_address, 
            description:contact.description,
            labels: contact.labels,
        }));
        }
    }, [currId,contact,contactDetails.count])

    const handleSaveClick = (event) => {
      if (contactDetails){
        dispatch(update_contact(currId, contactDetails))
        handleClose();
      }

    }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const animatedComponents = makeAnimated();

  const addLabels = (e) => {
    var labels_names_ids = e;

    setContactDetails({
      ...contactDetails,
      labels: labels_names_ids,
    });
  };
    return (
      <div className={classes.root}>
        <div className={classes.deleteContact}>
          <div className="updateContact">
            <Fab
              color="primary"
              aria-label="update"
              onClick={handleClickOpen}
              style={{ display: "flex" }}
            >
              <UpdateIcon />
            </Fab>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Update contact</DialogTitle>
              <Container component="main" maxWidth="xs">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  label="Contacts"
                  value={contactDetails.labels}
                  isMulti
                  options={new_labels}
                  onChange={addLabels}
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="First Name"
                  type="first_name"
                  fullWidth
                  value={contactDetails.first_name}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      first_name: e.target.value,
                    })
                  }
                ></TextField>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Last Name"
                  type="last_name"
                  fullWidth
                  value={contactDetails.last_name}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      last_name: e.target.value,
                    })
                  }
                ></TextField>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Business"
                  type="business"
                  fullWidth
                  value={contactDetails.business}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      business: e.target.value,
                    })
                  }
                ></TextField>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Relationship"
                  type="relationship"
                  fullWidth
                  value={contactDetails.relationship}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      relationship: e.target.value,
                    })
                  }
                ></TextField>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  value={contactDetails.email_address}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      email_address: e.target.value,
                    })
                  }
                ></TextField>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Phone number"
                  type="phone_number"
                  fullWidth
                  value={contactDetails.phone_number}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      phone_number: e.target.value,
                    })
                  }
                ></TextField>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Description"
                  type="description"
                  fullWidth
                  value={contactDetails.description}
                  onChange={(e) =>
                    setContactDetails({
                      ...contactDetails,
                      description: e.target.value,
                    })
                  }
                ></TextField>
                <div className="note_footer">
                  <Button className="Add to contacts" onClick={handleSaveClick}>
                    Save changes
                  </Button>
                </div>
              </Container>
            </Dialog>
          </div>
        </div>
      </div>
    );
};

export default UpdateContact