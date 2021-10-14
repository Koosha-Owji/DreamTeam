/**
 * NotePages.js, contains the frontend layout of the Notes PAGE 
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Reference: James Grimshaw, Notes App [https://github.com/jrgrimshaw/notes-app-tutorial](2021)
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */


import React from "react";
import NoteList from "./NoteList";
import AddNote from "./AddNote";

import { useDispatch, useSelector } from "react-redux";

import { get_allNotes, deleteNote } from "../../actions/notes";

/**
 * This function is used to retrieve notes from the backend and then passes them to the required 
 * fucntions/components to be rendered in the note page
 * @returns {the note page layout to be rendered} 
 */
function NotePages() {
  const dispatch = useDispatch();
  // Notes from database will go here
  const notes = useSelector((state) => state.note);
  React.useEffect(() => {
    dispatch(get_allNotes());
  }, [dispatch]);

  // on Click of the delete button call the backend function of deleteNote with the id of note to be deleted
  const handleDeleteNote = (Id) => {
    dispatch(deleteNote(Id));
  };
  const [currentId, setCurrentId] = React.useState(null);

  return (
    <div className="container">
      <div className="flex_container">
        <NoteList
          notes={notes}
          handleDeleteNote={handleDeleteNote}
          setCurrentId={setCurrentId}
        />
      </div>

      <div className="right_container">
        <AddNote currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
}

export default NotePages;
