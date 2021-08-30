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

const Contact = props => (
  <tr>
    <td>{props.contacts.first_name}</td>
    <td>{props.contacts.last_name}</td>
    <td>{props.contacts.business}</td>
    <td>{props.contacts.relationship}</td>
    <td>{props.contacts.phone_number}</td>
    <td>{props.contacts.description}</td>
{/* 

    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)

export default class ContactsPage extends Component {
  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {contacts: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/contacts/')
      .then(response => {
        this.setState({ contacts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // deleteExercise(id) {
  //   axios.delete('http://localhost:5000/exercises/'+id)
  //     .then(response => { console.log(response.data)});

  //   this.setState({
  //     exercises: this.state.exercises.filter(el => el._id !== id)
  //   })
  // }

  contactList() {
    return this.state.contacts.map(currentcontact => {
      return <Contact contact={currentcontact} key={currentcontact._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.contactList() }
          </tbody>
        </table>
      </div>
    )
  }
}





// export default function ContactsPage() {
//   const classes = useStyles();

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };


//   return (
//     <div className={classes.root}>
//         <div className = {classes.addContact}>
//             <Fab color="primary" aria-label="add"  onClick={handleClickOpen}>
//                 <AddIcon />
//             </Fab>
//             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Add a new contact</DialogTitle>
//         <addContact />
//         <DialogContent>
//           <DialogContentText>
//             Please enter contact information below.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="First Name"
//             type="first_name"
//             fullWidth
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Last Name"
//             type="last_name"
//             fullWidth
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Business"
//             type="business"
//             fullWidth
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Relationship"
//             type="relationship"
//             fullWidth
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Phone number"
//             type="phone_number"
//             fullWidth
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Description"
//             type="description"
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Add to Contacts
//           </Button>
//         </DialogActions>
//       </Dialog>
//         </div>
        
//       <Accordion defaultExpanded>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1c-content"
//           id="panel1c-header"
//         >
//           <div className={classes.column}>
//             <Typography className={classes.heading}>Contact</Typography>
//           </div>
//           <div className={classes.column}>
//             <Typography className={classes.secondaryHeading}>Information</Typography>
//           </div>
//         </AccordionSummary>
//         <AccordionDetails className={classes.details}>
//           <div className={classes.column} />
//           <div className={classes.column}>
//             <Chip label="Contractor" onDelete={() => {}} />
//           </div>
//           <div className={clsx(classes.column, classes.helper)}>
//             <Typography variant="caption">
//               Actions
//               <br />
//               <a href="#secondary-heading-and-columns" className={classes.link}>
//                 Email
//               </a>
//             </Typography>
//           </div>
//         </AccordionDetails>
//         <Divider />
//         <AccordionActions>
//           <Button size="small">Cancel</Button>
//           <Button size="small" color="primary" href="/contacts/add">
//             Save
//           </Button>
//         </AccordionActions>
//       </Accordion>
//     </div>
//   );
// }