/**
 * AddContact.component.js, user can add a contact
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

import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { update_user } from '../../actions/user';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: theme.spacing(1),
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    update: {

    }
}));
  

const  UpdateProfile=({profile})=> {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();
    const [profileDetails, setProfileDetails]=useState({
        first_name: '',
        last_name: '',
        department: '',
        role: '',
        email_address:'',
        email_service: profile.result.email_service,
        password: profile.result.password,
        refresh_token: profile.result.refresh_token,
        _id: profile.result._id,
        count:''
    });

    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        if (profile){
            setProfileDetails(profileDetails=>({
                ...profileDetails,
                first_name: profile.result.first_name, 
                last_name: profile.result.last_name,
                email_address: profile.result.email_address,
                department: profile.result.department,
                role: profile.result.role

            }));
        }
    },[profile,profileDetails.count]
    )

    const handleSaveClick = (event) => {
        if (profileDetails){
            event.preventDefault();
            dispatch (update_user(profileDetails,history))
            handleClose();
        }

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
    <div className={classes.root}>
            <div className = {classes.deleteContact}>
                <div className ='updateProfile'>
                {/* Update button */}
                <Fab color="primary" aria-label="update" onClick={handleClickOpen} style={{display:'flex'}} >
                    <UpdateIcon/>
                </Fab>
                {/* Title of update pop-up */}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
                <Container component="main" maxWidth="xs">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="First Name"
                        type="first_name"
                        fullWidth
                        value = {profileDetails.first_name}
                        onChange={(e) => setProfileDetails({...profileDetails, first_name:e.target.value})}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Last Name"
                        type="last_name"
                        fullWidth
                        value = {profileDetails.last_name}
                        onChange={(e) => setProfileDetails({...profileDetails, last_name:e.target.value})}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value = {profileDetails.email_address}
                        onChange={(e) => setProfileDetails({...profileDetails, email_address:e.target.value})}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Department"
                        type="department"
                        fullWidth
                        value = {profileDetails.department}
                        onChange={(e) => setProfileDetails({...profileDetails, department:e.target.value})}
                    ></TextField>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Role"
                        type="role"
                        fullWidth
                        value = {profileDetails.role}
                        onChange={(e) => setProfileDetails({...profileDetails, role:e.target.value})}
                    ></TextField>
                    
                    <div className = 'note_footer'>
                        <Button className = "Save user update" onClick={handleSaveClick} >Save changes</Button>
                    </div>
                </Container>
                
                </Dialog>
                </div>

                </div>
            </div>
                
    );
};

export default UpdateProfile