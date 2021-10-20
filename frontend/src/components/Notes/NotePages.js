import React from "react";
import NoteList from "./NoteList";
import AddNote from "./AddNote";
import SearchBar from "material-ui-search-bar";
import "./note.css";

import { useDispatch, useSelector } from "react-redux";

import { get_allNotes, deleteNote } from "../../actions/notes";

var notesList = [];
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
        return i.title.toLowerCase().match(search);
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
