import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import ContactList from './contactList.component';
import AddContact from './addContact.component';


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
      marginLeft:'70%',
      padding:'10px'
  }
}));


export default function ContactsPage() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const dispatch = useDispatch();
  // const [contactList, setContactList]=React.useState([]);
  // const contacts = useSelector((state)=>state.contact);
  // React.useEffect(()=>{
  //   dispatch(get_all_contacts());
  //   if(contacts)setContactList(contacts);
  // }, [dispatch, contacts])

  // const delete_contact = (id) => {
  //   const newContacts = contactList.filter((contactList) => contactList._id !== id);
	// 	setContactList(newContacts);
  //   // to dispatch delete Notes here with Id being Note ID
  // }


  return (
    <div className={classes.root}>
        <div className = {classes.addContact}>
            <Fab color="primary" aria-label="add" variant='extended' onClick={handleClickOpen}>
            <AddIcon className={classes.extendedIcon}/>
                Add New Contact
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new contact</DialogTitle>
        <AddContact />
        
      </Dialog>
        </div>
      <ContactList />
    </div>
  );
}