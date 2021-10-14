/**
 * SendContactEmail.component.js, component for deleting a contact
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import Fab from '@material-ui/core/Fab';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import Google from '../Email/Google.component';

import Dialog from '@material-ui/core/Dialog';

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
  
  
  export default function SendContactEmail() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
      <div className={classes.root}>
          <div className = {classes.deleteContact}>
              <Fab color="primary" aria-label="delete"  onClick={handleClickOpen} style={{display:'flex'}}>
                  <EmailIcon/>
              </Fab>
              <Dialog open={open} maxWidth='xl' onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth="false" >
          <Google/>
          
        </Dialog>
          </div>
          </div>
);
    }