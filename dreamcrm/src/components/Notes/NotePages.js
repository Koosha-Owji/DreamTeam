import React from "react";
import { nanoid } from "nanoid";
import NoteList from './NoteList'
import { useDispatch, useSelector } from 'react-redux';

import { get_allNotes } from '../../actions/notes';


function NotePages() {
  const dispatch = useDispatch();
  // Notes from database will go here
  const [notesData, setNotes] = React.useState([]);
  const notes = useSelector((state) => state.note);
  React.useEffect(() => {
    dispatch(get_allNotes());
    if(notes)setNotes(notes);
  }, [dispatch,notes]);
  

  //to be relaced by the backend function
  const AddNote = (userText) => {
    const newNote = {
      Id:nanoid(), 
      title: userText.title,
      meetingId: "ID",
      text: userText.content
    }
    const newNotes = [...notesData, newNote];
    setNotes(newNotes)
  }

  const deleteNote = (Id) => {
    const newNotes = notesData.filter((notesData) => notesData.Id !== Id);
		setNotes(newNotes);
  }

  // const AddNote = (userText) => {
  //   dispatch(createNote(userText));
  // }
  // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
      <div className='flex_container'>

			<NoteList 
        handleAddNote = {AddNote}
        notes = {notesData} 
        handleDeleteNote = {deleteNote}
        />
		</div>
    )  
}


export default NotePages