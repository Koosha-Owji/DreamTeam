/**
 * Note.js, takes each incdivdual note attribute and renders that information in the
 * appropriate format and position
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Reference: James Grimshaw, Notes App [https://github.com/jrgrimshaw/notes-app-tutorial](2021)
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import React from "react";
import "./note.css";

/**
 * For every note retrived from the notes list, create a Note component to be rendered
 * also, make sure that every note has the reuired fucntionalities such as edit and delete 
 * @param {note Id} Id 
 * @param {title of the note} title
 * @param {meeting id of the note } meetingId 
 * @param {content of the note} text
 * @param {a function that handles when the notes click the delete button} handleDeleteNote
 * @param {a fucntion that sets the currentId to be the id of the note being edited} setCurrentId
 * @returns {a Note component ready to be rendered} 
 */
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
