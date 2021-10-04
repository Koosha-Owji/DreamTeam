import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Note from "@material-ui/icons/Note";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createNote, updateNote } from "../../actions/notes";
import { getMeetingNote } from "../../api/index";

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

export default function AddMeetingNote({ id , meeting_title1}) {
  const dispatch = useDispatch();
  // const [noteId, setNoteId] = React.useState(null);

  const [noteText, setNoteText] = useState({
    title: "",
    content: "",
    meeting_title : meeting_title1,
    meeting_id: id,
  });

  const clear = () => {
    setNoteText({ title: "", content: "" });
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    getMeetingNote(id)
      .then((response) => {
        if (response.data.length > 0) {
          setNoteText({
            title: response.data[0].title,
            content: response.data[0].content,
            meeting_title: meeting_title1,
            meeting_id: id,
          });
          noteId = response.data[0]._id;
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
          <div className="note new">
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
