/**
 * AddNote.js, renders the add note box in which the user can input their note information and save
 * the new note. Also, if the currentId is valid the add note box displays the information of the corresponding
 * note to be edited
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Reference: James Grimshaw, Notes App [https://github.com/jrgrimshaw/notes-app-tutorial](2021)
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { createNote, updateNote } from "../../actions/notes";
import "./note.css";

/**
 * @param {current Id of the note being edited or null if its a new note} currentId
 * @param {a fucntion that sets the currentId to be the id of the note being edited} setCurrentId 
 * @returns {an AddNote component to be rendered and depending on currentId, displays the required note information} 
 */
const AddNote = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState({
    title: "",
    content: "",
    count: "",
  });

  const note = useSelector((state) =>
    currentId ? state.note.find((n) => n._id === currentId) : null
  );

  // everytime someone clicks edit, change the add note to edit the current note
  useEffect(() => {
    if (note) {
      setNoteText((noteText) => ({
        ...noteText,
        title: note.title,
        content: note.content,
      }));
    }
  }, [currentId, noteText.count, note]);

  /**
   * Clears the information in the note Text, i.e, the information displayed in the Add Note component
   */
  const clear = () => {
    setCurrentId(null);
    setNoteText({ title: "", content: "" });
  };

  /**
   * Everytime the Save button is clicked, this function checks the currentId to deduce whether the note is edited or saved
   * and then performs the appropriate actions on it, and then clears the noteText
   * @param {the event that occured, i.e clicking the save button} event
   */
  const handleSaveClick = (event) => {
    if (noteText.content.trim().length > 0) {
      // IF THE NOTE IS BEING UPDATED
      if (currentId) {
        dispatch(updateNote(currentId, noteText));
        clear();
        // getpost after updating
      }

      // IF ITS A NEW NOTE BEING ADDED
      else {
        event.preventDefault();
        dispatch(createNote(noteText));
        clear();
        //setNoteText({title: '', content: '' });
        // setCurrentId('');
      }
    }
  };

  return (
    <div className="note new">
      <MdModeEdit cursor="pointer" color="#bbdefb" size="1.3em" />
      <textarea
        rows="1"
        cols="10"
        placeholder="Title"
        name="title"
        value={noteText.title}
        onChange={(e) => setNoteText({ ...noteText, title: e.target.value })}
      ></textarea>
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add new note*"
        name="content"
        value={noteText.content}
        onChange={(e) => setNoteText({ ...noteText, content: e.target.value })}
      ></textarea>
      <div className="note_footer">
        <small>{currentId ? "Edit " : "New "}Note</small>
        <button className="save" onClick={clear}>
          Cancel
        </button>
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
