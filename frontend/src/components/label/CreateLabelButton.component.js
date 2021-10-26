/**
 * CreateLabelButton.component.js, createLabelButton controls dialogue with createLabel form input
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CreateLabel from './CreateLabel.component';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


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
  }
}));


export default function CreateLabelButtonPage({finaliseUpdate}) {
  const classes = useStyles();

  const dispatch=useDispatch();

  const [label, setLabel]=useState({
    title:"",
    colour:"",
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit=(e)=> {
    e.preventDefault();
    /**Closes the dialogue which is controlled from the parent component: ManageLabels */
    finaliseUpdate(label);
    handleClose();
    
  }

 



  return (
    <div className={classes.root}>
            <Fab color="primary" aria-label="add" variant='extended' onClick={handleClickOpen}>
            <AddIcon className={classes.extendedIcon}/>
                Add New Label
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Label</DialogTitle>
        {/* <CreateLabel closeFromChild = {closeFromChild} /> */}
        <Container component="main" maxWidth="xs">
        <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="title"
                fullWidth
                value = {label.title}
                onChange={(e)=>setLabel({...label, title:e.target.value})}
            ></TextField>
            <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Colour</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={label.colour}
            onChange={(e)=>setLabel({...label, colour:e.target.value})}
            >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"#90caf9"} style={{backgroundColor:'#90caf9'}}>Blue</MenuItem>
          <MenuItem value={"#e57373"} style={{backgroundColor:'#e57373'}}>Red</MenuItem>
          <MenuItem value={"#b39ddb"} style={{backgroundColor:'#b39ddb'}}>Purple</MenuItem>
          <MenuItem value={"#fff176"} style={{backgroundColor:'#fff176'}}>Yellow</MenuItem>
          <MenuItem value={"#ff8a65"} style={{backgroundColor:'#ff8a65'}}>Orange</MenuItem>
          <MenuItem value={"#81c784"} style={{backgroundColor:'#81c784'}}>Green</MenuItem>
        </Select>
      </FormControl>


            <div className = 'note_footer'>
                <Button className = "Add label" onClick={onSubmit}>Save</Button>
            </div>

      </Container>
        </Dialog>
    </div>
  );
} 