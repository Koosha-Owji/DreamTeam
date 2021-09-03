import Fab from '@material-ui/core/Fab';
import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';


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
  
  
  export default function UpdateContact() {
    const classes = useStyles();
  
    return (
        <div className={classes.root}>
            <div className = {classes.deleteContact}>
                <Fab color="primary" aria-label="delete" href='/emails'style={{display:'flex'}}>
                    <UpdateIcon/>
                </Fab>
                
            </div>
            </div>
  );
}