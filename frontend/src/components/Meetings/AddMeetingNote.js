/**
 * AddMeetingNote.js, pop up for the users to creating a new note connected to the selected meeting
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Note from "@material-ui/icons/Note";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createNote, updateNote } from "../../actions/notes";
import { getMeetingNote } from "../../api/index";
import "../Notes/note.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(1),
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
}));
var noteId;

export default function AddMeetingNote({ id, meeting_title1 }) {
  const dispatch = useDispatch();

  // Note Data, intially empty
  const [noteText, setNoteText] = useState({
    title: "",
    content: "",
    meeting_title: meeting_title1,
    meeting_id: id,
  });

  const clear = () => {
    setNoteText({ title: "", content: "" });
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  // when the note button is clicked, display the note formatting
  const handleClickOpen = () => {
    setOpen(true);
    getMeetingNote(id)
      .then((response) => {
        if (response.data) {
          setNoteText({
            title: response.data.title,
            content: response.data.content,
            meeting_title: meeting_title1,
            meeting_id: id,
          });
          noteId = response.data._id;
        } else {
          setNoteText({
            title: "",
            content: "",
            meeting_title: meeting_title1,
            meeting_id: id,
          });
          noteId = null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Everytime the Save button is clicked, this function checks the noetId to deduce whether the note is edited or saved
   * and then performs the appropriate actions on it
   * @param {the event that occured, i.e clicking the save button} event
   */
  const handleSaveNote = (event) => {
    if (noteText.content.trim().length > 0) {
      // IF THE NOTE IS BEING UPDATED
      if (noteId) {
        dispatch(updateNote(noteId, noteText));
        handleClose();
      }
      // IF THE NOTE IS BEING CREATED
      else {
        event.preventDefault();
        dispatch(createNote(noteText));
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.deleteContact}>
        {/* {checkNoteId} */}
        <Fab
          color="primary"
          aria-label="delete"
          onClick={handleClickOpen}
          style={{ display: "flex" }}
        >
          <Note />
        </Fab>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <div className="meeting_note new">
            <textarea
              rows="2"
              cols="10"
              placeholder="Title"
              name="title"
              value={noteText.title}
              onChange={(e) =>
                setNoteText({ ...noteText, title: e.target.value })
              }
            ></textarea>
            <textarea
              rows="8"
              cols="10"
              placeholder="Type to add new note*"
              name="content"
              value={noteText.content}
              onChange={(e) =>
                setNoteText({ ...noteText, content: e.target.value })
              }
            ></textarea>
            <div className="note_footer">
              <small>Meeting Note</small>
              <button className="save" onClick={clear}>
                Clear
              </button>
              <button className="save" onClick={handleSaveNote}>
                Save
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
