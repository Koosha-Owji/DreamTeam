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
import { update_contact } from '../../actions/contact';
const initialState = {
    first_name: '',
    last_name: '',
    business: '',
    relationship: '',
    email_address:'', 
    phone_number:'', 
    description:'',
    }

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
    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData]=React.useState({
    first_name: '',
    last_name: '',
    business: '',
    relationship: '',
    email_address:'', 
    phone_number:'', 
    description:''
    });

    const contact = useSelector((state) => 
    id ? state.contact.find((n) => n._id === id) : null);


    useEffect(() => {
        if (contact){
        setData({
            ...data,
            first_name:contact.first_name, 
            last_name:contact.last_name,
            business:contact.business,
            relationship:contact.realtionship, 
            phone_number: contact.phone_number,
            email_address:contact.email_address, 
            description:contact.description
        })
         }
    }, [currentId])


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(update_contact(id, form));
      };
      const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  
    return (
        <div className={classes.root}>
            <div className = {classes.deleteContact}>
                
                <Fab color="primary" aria-label="update"  onClick={handleClickOpen} >
                  <UpdateIcon/>
                </Fab>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Update contact</DialogTitle>
                  <Container component="main" maxWidth="xs">
          <div>
        <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First Name"
                type="first_name"
                fullWidth
                value = {this.initialState.first_name}
                onChange={handleChange}
            ></TextField>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Last Name"
                type="last_name"
                fullWidth
                value = {this.initialState.last_name}
                onChange={handleChange}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Business"
                type="business"
                fullWidth
                value = {this.initialState.business}
                onChange={handleChange}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Relationship"
                type="relationship"
                fullWidth
                value = {this.initialState.relationship}
                onChange={handleChange}
            ></TextField>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                value = {this.initialState.email_address}
                onChange={handleChange}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Phone number"
                type="phone_number"
                fullWidth
                value = {this.initialState.phone_number}
                onChange={handleChange}
            ></TextField>
             <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Description"
                type="description"
                fullWidth
                value = {this.initialState.description}
                onChange={handleChange}
            ></TextField>
            <div className = 'note_footer'>
                <Button className = "Add to contacts" onClick={handleSubmit}>Save</Button>
            </div>
      </div>
      </Container>
                  
                </Dialog>
                
            </div>
            </div>
  );
}

