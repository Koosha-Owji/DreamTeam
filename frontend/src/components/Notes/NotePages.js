import React from "react";
import NoteList from './NoteList'
import AddNote from './AddNote'

import { useDispatch, useSelector } from 'react-redux';

import { get_allNotes, deleteNote} from '../../actions/notes';


function NotePages() {
  const dispatch = useDispatch();
  // Notes from database will go here

  const notes = useSelector((state) => state.note);
  React.useEffect(() => {
    dispatch(get_allNotes());
  }, [dispatch]);
 
  const handleDeleteNote = (Id) => {
    dispatch(deleteNote(Id));
  }
  const [currentId, setCurrentId] = React.useState(null)

    return (
      <div className='container'>

        <div className = 'flex_container'>
          <NoteList
            notes = {notes}
            handleDeleteNote = {handleDeleteNote}
            setCurrentId = {setCurrentId}
          />
        </div>

        <div className = 'right_container'>
          <AddNote currentId = {currentId} setCurrentId = {setCurrentId}/>
        </div>

		</div>
    )
}


export default NotePages
