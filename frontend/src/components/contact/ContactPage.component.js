/**
 * contactPage.component.js, component that stores contact components (contactList, delete, add)
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import ContactList from './contactList.component';
import AddContact from './addContact.component';
import ManageLabel from './../label/ManageLabels.component';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  addContact:{
    marginLeft:'60%',
    padding:'10px',
    display:'flex', 
},
manageLabel:{
  marginLeft:'60%',
    padding:'10px',
    display:'flex', 
}
}));


export default function ContactsPage() {
  const classes = useStyles();

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };


  return (
    <div className={classes.root}>
        <div className = {classes.addContact}>
            <Fab color="primary" aria-label="add" variant='extended' onClick={handleClickOpen1}>
              <AddIcon className={classes.extendedIcon}/>
                Add New Contact
            </Fab>
           <Dialog open={open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add a new contact</DialogTitle>
            <AddContact />
            </Dialog>
            </div>
            <div className = {classes.manageLabel}>
            <Fab color="primary" aria-label="add" variant='extended' onClick={handleClickOpen2}>
            <AddIcon className={classes.extendedIcon}/>
                Manage Labels
            </Fab>
            <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title" fullWidth='true'>
              <DialogTitle id="form-dialog-title" >Manage Labels</DialogTitle>
            <ManageLabel/>
            </Dialog>
            </div>
      <ContactList />
    </div>
  );
}