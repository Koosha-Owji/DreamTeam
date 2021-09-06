
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


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
            <div className = {classes.contactLabel}>
            <Chip label="label" onDelete={() => {}} />
                
            </div>
            </div>
  );
}