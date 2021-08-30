import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';



const Contacts = ({ setCurrentId }) => {
  const contacts = useSelector((state) => state.contacts);
  const classes = useMake

  return (
    !contacts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {contacts.map((contact) => (
          <Grid key={contact.first_name} item xs={12} sm={6} md={6}>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Contacts;