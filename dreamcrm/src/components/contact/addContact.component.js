import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Link } from 'react-router-dom';
import axios from 'axios';


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
//const classes = useStyles();

export default class AddContact extends Component {
   
    constructor(props) {
    super(props);

    this.onChangefirst_name = this.onChangefirst_name.bind(this);
    this.onChangelast_name = this.onChangelast_name.bind(this);
    this.onChangebusiness = this.onChangebusiness.bind(this);
    this.onChangerelationship= this.onChangerelationship.bind(this);
    this.onChangephone_number = this.onChangephone_number.bind(this);
    this.onChangeemail_address = this.onChangeemail_address.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
    first_name: '',
    last_name: '',
    business: '',
    relationship: '',
    email_address:'', 
    phone_number:'', 
    description:''
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const contact = {
      first_name:this.state.first_name,
      last_name:this.state.last_name, 
      business:this.state.business,
      relationship:this.state.relationship, 
      email_address:this.state.email_address,
      phone_number:this.state.phone_number,
      description:this.state.description
    };
  console.log(contact);
  window.location = '/';
  }



  onChangefirst_name(e) {
    this.setState({
      first_name: e.target.value
    });
  }
  onChangelast_name(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onChangebusiness(e) {
    this.setState({
      business: e.target.value
    });
  }
  onChangerelationship(e) {
    this.setState({
      relationship: e.target.value
    });
}
onChangephone_number(e) {
    this.setState({
      phone_number: e.target.value
    });
}
onChangedescription(e) {
    this.setState({
      description: e.target.value
    });
}
onChangeemail_address(e) {
    this.setState({
      email_address: e.target.value
    });
  }
  render() {

  return (
    <div className={classes.root}>
        <div className = {classes.addContact}>
            <Fab color="primary" aria-label="add"  onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new contact</DialogTitle>
        <addContact />
        <DialogContent>
          <DialogContentText>
            Please enter contact information below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="first_name"
            fullWidth
            value = {this.state.first_name}
            onChange={this.onChangefirst_name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="last_name"
            fullWidth
            value = {this.state.last_name}
            onChange={this.onChangelast_name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value = {this.state.business}
            onChange={this.onChangebusiness}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Business"
            type="business"
            fullWidth
            value = {this.state.relationship}
            onChange={this.onChangerelationship}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Relationship"
            type="relationship"
            fullWidth
            value = {this.state.phone_number}
            onChange={this.onChangephone_number}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone number"
            type="phone_number"
            fullWidth
            value = {this.state.description}
            onChange={this.onChangedescription}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="description"
            fullWidth
            value = {this.state.email_address}
            onChange={this.onChangeemail_address}
          />
        </DialogContent>
        <DialogActions> */}
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Add to Contacts
          </Button>
        </DialogActions>
      </Dialog> */}
        </div>
     </div>
  )
}
}

