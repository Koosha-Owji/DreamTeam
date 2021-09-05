import Fab from '@material-ui/core/Fab';
import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UpdateContactPopUp from './UpdateContactPopUp.component';


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
  
  
  export default function UpdateContact({id}) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [data, setData]=React.useState('');

    

    const passId=(id)=>{
      setData(id)
      console.log(id);
      handleClickOpen();
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
                
                <Fab color="primary" aria-label="update"  onClick={()=>passId(id)} >
                  <UpdateIcon/>
                </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Update contact</DialogTitle>
                  <UpdateContactPopUp passId={data}/>
                  
                </Dialog>
                
            </div>
            </div>
  );
}

