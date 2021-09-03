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
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { delete_contact } from '../../actions/contact';

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
  
  
  export default function DeleteContact({contact}) {
    const classes = useStyles();
    const dispatch = useDispatch();
  
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
                    <DeleteIcon/>
                </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Are you sure you want to remove this contact?</DialogTitle>
            <DialogActions>
              <Button onClick={()=>dispatchEvent(delete_contact(contact._id))} color="primary">
                Delete
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
            
          </Dialog>
            </div>
            </div>
  );
}