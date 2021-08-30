import React from "react";
import { nanoid } from "nanoid";
import NoteList from './NoteList'


function NotePages() {

  const intial_state = {title: '', content: '', userId: ''}

  // Notes from database will go here
    const [notes, setNotes] = React.useState([{
    Id: nanoid(),
    title: "Note Title",
    meetingId: "ID",
    text: "This id the note one"
  }, 
  {
    Id: nanoid(),
    title: "Note Title",
    meetingId: "ID",
    text: "This id the note two"
  },
  {
    Id: nanoid(),
    title: "Note Title",
    meetingId: "ID",
    text: "This id the note three"
  },
  {
    Id: nanoid(),
    title: "Note Title",
    meetingId: "ID",
    text: "This id the note four"
    }
  ]); 

  //to be relaced by the backend function
  const AddNote = (userText) => {
    const newNote = {
      Id:nanoid(), 
      title: userText.title,
      meetingId: "ID",
      text: userText.content
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes)
  }

  const deleteNote = (Id) => {
    const newNotes = notes.filter((notes) => notes.Id !== Id);
		setNotes(newNotes);
  }

  // const AddNote = (userText) => {
  //   dispatch(createNote(userText));
  // }
  // const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
      <div className='flex_container'>

			<NoteList 
        notes = {notes} 
        handleAddNote = {AddNote}
        handleDeleteNote = {deleteNote}
        />
		</div>
    )  
}


export default NotePages