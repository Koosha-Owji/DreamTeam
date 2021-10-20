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
import SearchBar from "material-ui-search-bar";
import "./note.css";

import { useDispatch, useSelector } from "react-redux";

import { get_allNotes, deleteNote } from "../../actions/notes";

var notesList = [];

/**
 * This function is used to retrieve notes from the backend and then passes them to the required
 * fucntions/components to be rendered in the note page
 * @returns {the note page layout to be rendered}
 */
function NotePages() {
  const dispatch = useDispatch();
  // Notes from database will go here

  var notes = useSelector((state) => state.note);
  React.useEffect(() => {
    dispatch(get_allNotes());
  }, [dispatch]);

  const handleDeleteNote = (Id) => {
    dispatch(deleteNote(Id));
  };

  const [currentId, setCurrentId] = React.useState(null);

  const [searchString, setSearchString] = React.useState("");

  const handleSearch = (e) => {
    if (e) {
      setSearchString(e.trim().toLowerCase());
      searchFunc(searchString);
    } else {
      setSearchString(e);
      notesList = notes;
    }
  };

  const searchFunc = (search) => {
    if (search.length > 0) {
      notesList = notes.filter(function (i) {
        try {return (
          i.title.toLowerCase().match(search) ||
          i.content.toLowerCase().match(search) 
        );
        } catch (e) {
          console.log(e);
          notesList = notes
          return notesList;
        }
      });
    } else {
      notesList = notes;
    }
  };

  searchFunc(searchString);
  return (
    <div className="container">
      <SearchBar
        value={searchString}
        onChange={handleSearch}
        onRequestSearch={() => console.log("onRequestSearch")}
        style={{
          margin: "0 auto",
          maxWidth: 800,
        }}
      />
      <div className="flex_container">
        <NoteList
          notes={notesList}
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
