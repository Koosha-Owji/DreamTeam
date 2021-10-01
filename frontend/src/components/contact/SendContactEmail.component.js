import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EmailIcon from '@material-ui/icons/Email';


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
  
    return (
        <div className={classes.root}>
            <div className = {classes.deleteContact}>
                <Fab color="primary" aria-label="delete" href='/emails'style={{display:'flex'}}>
                    <EmailIcon/>
                </Fab>
                
            </div>
            </div>
  );
}