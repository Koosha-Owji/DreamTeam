import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import React from "react";
import "./note.css";

const Note = ({
  Id,
  title,
  meetingTitle,
  text,
  handleDeleteNote,
  setCurrentId,
}) => {
  return (
    <div className="note">
      <MdModeEdit
        cursor="pointer"
        className="edit_icon"
        size="1.3em"
        onClick={() => setCurrentId(Id)}
      />
      <small align="left">
        <b>{title}</b>
      </small>
      <small align="left">{text}</small>
      <div className="note_footer">
        <small align="left">{meetingTitle}</small>
        <MdDelete
          onClick={() => handleDeleteNote(Id)}
          className="delete_icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
