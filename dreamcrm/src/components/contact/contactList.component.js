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
import axios from 'axios';
import Contact from './Contact.component';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
//   icon: {
//     verticalAlign: 'bottom',
//     height: 20,
//     width: 20,
//   },
//   details: {
//     alignItems: 'center',
//   },
//   column: {
//     flexBasis: '33.33%',
//   },
//   helper: {
//     borderLeft: `2px solid ${theme.palette.divider}`,
//     padding: theme.spacing(1, 2),
//   },
  // link: {
  //   color: theme.palette.primary.main,
  //   textDecoration: 'none',
  //   '&:hover': {
  //     textDecoration: 'underline',
  //   },
  // },
// }));
// const Contact = props =>(
//   <tr>
//     <td>{props.contactDetails.first_name}</td>
//     <td>{props.contactDetails.last_name}</td>
//     <td>{props.contactDetails.business}</td>
//     <td>{props.contactDetails.relationship}</td>
//     <td>{props.contactDetails.phone_number}</td>
//     <td>{props.contactDetails.email_address}</td>
//     <td>{props.contactDetails.description}</td>
//     </tr>
//   )


export default class ContactCard extends Component{
// const classes = useStyles();
constructor(props){
    super(props);
    this.state = {contacts: []};
}

componentDidMount() {
    axios.get('http://localhost:5000/contacts')
      .then(response => {
        this.setState({ contacts: response.data })
      })
      .then(console.log('contacts received'))
      .catch((error) => {
        console.log(error);
      })
  }

  //   

  displayContactList=(contacts)=>{
    if(!contacts.length) return null;

    return contacts.map((contact, index)=>(
      <div key = {index}>
        <text>{contact.first_name}, {contact.last_name}</text>
      </div>
    ));

  }

  render(){

      console.log('State: ', this.state);

      return(
    // <div className={classes.root}>
    //     {/* <div>
    //     {contacts.map((contacts) => (
    //             <Contact first_name = {contacts.first_name} last_name= {contacts.last_name}
    //                 business = {contacts.business} description = {contacts.description}
    //                 email_address={contacts.email_address} phone_number={contacts.phone_number}/>
    //         ))}
        
    //   </div> */}
    //      <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel1c-content"
    //       id="panel1c-header"
    //     >
    //       <div className={classes.column}>
    //         <Typography className={classes.heading}>Contact</Typography>
    //       </div>
    //       <div className={classes.column}>
    //         <Typography className={classes.secondaryHeading}>Information</Typography>
    //       </div>
    //     </AccordionSummary>
    //     <AccordionDetails className={classes.details}>
    //       <div className={classes.column} />
    //       <div className={classes.column}>
    //         <Chip label="Contractor" onDelete={() => {}} />
    //       </div>
    //       <div className={clsx(classes.column, classes.helper)}>
    //         <Typography variant="caption">
    //           Actions
    //           <br />
    //           <a href="#secondary-heading-and-columns" className={classes.link}>
    //             Email
    //           </a>
    //         </Typography>
    //       </div>
    //     </AccordionDetails>
    //     <Divider />
    //     <AccordionActions>
    //       <Button size="small">Cancel</Button>
    //       <Button size="small" color="primary" href="/contacts/add">
    //         Save
    //       </Button>
    //     </AccordionActions> 

    <div className ='contactList'>
    {this.displayContactList(this.state.contacts)}
  </div>
    //  </div>
     
      );
    }
}