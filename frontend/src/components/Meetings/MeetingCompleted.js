import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/DoneAll";
import { markCompleted } from "../../actions/meetings";
import { useDispatch } from "react-redux";

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

export default function MeetingCompleted({ meeting }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    const current = new Date();
    if (current <= new Date(meeting.date_time)) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function finaliseCompleted(meeting) {
    const current = new Date();

    meeting.time =
      String(current.getHours()) +
      ":" +
      String(("0" + String(current.getMinutes() - 1)).slice(-2));
    meeting.endtime =
      String(current.getHours()) +
      ":" +
      String(("0" + String(current.getMinutes() - 1)).slice(-2));

    meeting.date =
      String(current.getFullYear()) +
      "-" +
      String(("0" + (current.getMonth() + 1)).slice(-2)) +
      "-" +
      String(("0" + current.getDate()).slice(-2));

    dispatch(markCompleted(meeting._id, meeting));
    handleClose();
  }

  return (
    <div className={classes.root}>
      <div className={classes.deleteContact}>
        <Fab
          color="primary"
          aria-label="delete"
          onClick={handleClickOpen}
          style={{ display: "flex" }}
        >
          <Check />
        </Fab>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Mark '{meeting.title}' as Completed?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => finaliseCompleted(meeting)} color="primary">
              Confirm
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}