import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { create_contact } from '../../actions/contact';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ 
    first_name: '',
    last_name: '',
    business: '',
    relationship: '',
    email_address:'', 
    phone_number:'', 
    description:''
    });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ 
    first_name: '',
    last_name: '',
    business: '',
    relationship: '',
    email_address:'', 
    phone_number:'', 
    description:''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(create_contact(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="first_name" variant="outlined" label="First Name" fullWidth value={postData.first_name} onChange={(e) => setPostData({ ...postData, first_name: e.target.value })} />
        <TextField name="last_name" variant="outlined" label="Last Name" fullWidth value={postData.last_name} onChange={(e) => setPostData({ ...postData, last_name: e.target.value })} />
        <TextField name="relationship" variant="outlined" label="Relationship" fullWidth value={postData.last_name} onChange={(e) => setPostData({ ...postData, relationship: e.target.value })} />
        <TextField name="business" variant="outlined" label="Business" fullWidth value={postData.business} onChange={(e) => setPostData({ ...postData, business: e.target.value })} />
        <TextField name="phone_number" variant="outlined" label="Phone Number" fullWidth value={postData.phone_number} onChange={(e) => setPostData({ ...postData, phone_number: e.target.value })} />
        <TextField name="email_address" variant="outlined" label="Email Address" fullWidth value={postData.email_address} onChange={(e) => setPostData({ ...postData, email_address: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;