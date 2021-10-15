import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import {Component} from 'react';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import ProfileCard from './ProfileCard.component.js';


export default function ProfilePage() {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <Grid container justifyContent = 'center'>
      <Grid item xs={12}>
      <ProfileCard/>
      </Grid> 
      
      </Grid>
    </div>

    // <div className={classes.root}>
    //     <div className = {classes.heading}>
    //         Your Profile
    //     </div>
    //     <Grid item xs={1}>
    //     <Update currId />
    //     {/* <Update currId ={contact._id} allContacts={contacts}/> */}
    //     </Grid>
    //     <div sx={{
    //       color: 'aliceblue',
    //       padding: 30,
    //       borderRadius: 4}}>
    //         <Box sx={{display: 'flex', justifyContent: 'left'}}> Olivia Ryan </Box>
    //       <EmailComponent> 
    //         <Box sx={{display: 'flex', justifyContent: 'left'}}> email@gmail.com </Box>
    //       </EmailComponent>
    //     </div>
    //     {/* <ProfileCard /> */}
    // </div>
  );
}


// class ProfileCard extends Component{
//     user = {
//         first_name: "Olivia", 
//         last_name: "Ryan", 
//         email_address: "email@gmail.com", 
//         department: "No dept.", 
//         role: "Teacher"
//     }

//     render () {
//         return(
//             <div className ='contactList'>
//                 {this.displayProfileDetails(this.user)}
//             </div>
//         );
//     }

//     displayProfileDetails2=({first_name, last_name, email_address, department, role})=>{
//         return (
//             <div>
//                 <h1 style={{textAlign:'left'}}>First Name: {first_name}</h1>
//                 <h1 style={{textAlign:'left'}}>Last Name: {last_name}</h1>
//                 <h1 style={{textAlign:'left'}}>Email: {email_address}</h1>
//             </div>
//         )
    
//     }


//     displayProfileDetails=({first_name, last_name, email_address, department, role})=>{
//         const classes = useStyles;

//         // return contacts.map((contact, index)=>(

//         return (
//           <div style = {{ width: '100%'}}>
//           <Box sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             p: 1,
//             m: 1,
//             bgcolor: 'background.paper'
//           }}>
//             <Typography component="div">
//             <Box sx={{justifyContent: 'center', fontSize: 'h6.fontSize', m:1}}>
//                Welcome, {first_name} {last_name} 
//             </Box>
//             </Typography>
//             <Box sx={{m:1, fontSize: 'default'}}>
//             <Typography className={classes.heading} > {email_address} </Typography>
//             </Box>
//           </Box>
//           </div>
//         );

//     }
// }


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    field: {
      fontSize: theme.typography.pxToRem(15),
    },
    heading: {
      fontSize: theme.typography.pxToRem(50),
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
    }
  }));