import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {createNote, updateNote} from '../../actions/notes';



const AddNote = ({currentId, setCurrentId}) => {
    const dispatch = useDispatch();
    const [noteText, setNoteText] = useState({title: '',content: ''});
    
    const note = useSelector((state) => currentId ? state.note.find((n) => n._id === currentId) : null);
    
    // everytime someone clicks edit, change the add note to edit the current note
    useEffect(() => {
        if (note){
        setNoteText({
            ...noteText,
            title: note.title,
            content:note.content
        })
         }
    }, [currentId])

    // clear all the fields 
    const clear = () => {
        setCurrentId(null);
        setNoteText({title: '', content: ''})
    }


    const handleSaveClick = (event) => {
        if (noteText.content.trim().length > 0){
            
            // IF THE NOTE IS BEING UPDATED  
            if (currentId) {
              dispatch (updateNote (currentId, noteText))
             clear();
            // getpost after updating
            }

            // IF ITS A NEW NOTE BEING ADDED
            else{
            event.preventDefault();
            dispatch(createNote(noteText));
            clear();
            //setNoteText({title: '', content: '' });
            // setCurrentId('');
            }
        }
    };


    return (
    <div className = "note new" >
        <textarea
            rows = '2'
            cols ='10'
            placeholder = 'Title' 
            name = 'title'
            value = {noteText.title}
            onChange={(e) => setNoteText({...noteText, title:e.target.value})}
        ></textarea>
        <textarea
            rows = '8'
            cols ='10'
            placeholder = 'Type to add new note' 
            name = "content"
            value = {noteText.content}
            onChange={(e) => setNoteText({...noteText, content:e.target.value})}
        ></textarea>
        <div className = 'note_footer'>
            <small>{currentId ? 'Edit ' : 'New '}Note</small>
            <button className = "save" onClick={clear}>Cancel</button>
            <button className = "save" onClick={handleSaveClick}>Save</button>
        </div>

    </div>)
}

export default AddNote;