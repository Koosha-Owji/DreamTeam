/**
 * AddContact.component.js, user can add a contact
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
  );
}

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