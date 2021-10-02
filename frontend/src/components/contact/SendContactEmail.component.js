import Fab from '@material-ui/core/Fab';
import React/*, {Component} */from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import Google from '../Email/Google.component'
import DeleteIcon from '@material-ui/icons/Delete';

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
              <Dialog open={open} maxWidth='xl' onClose={handleClose} aria-labelledby="form-dialog-title" >
          <Google/>
          
        </Dialog>
          </div>
          </div>
);
    }