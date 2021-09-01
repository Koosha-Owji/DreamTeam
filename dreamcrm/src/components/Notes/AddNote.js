import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createNote} from '../../actions/notes';


const AddNote = ({handleAddNote}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [noteText, setNoteText] = useState({title: '',content: ''});
    const handleChange = (event) => {
        const value = event.target.value
        setNoteText({
            ...noteText,
            [event.target.name]: value
        });
    }

    const handleSaveClick = (event) => {
        if (noteText.content.trim().length > 0){
            //handleAddNote(noteText);
            event.preventDefault();
            dispatch(createNote(noteText, history));
            setNoteText({title: '', content: '' });
        }
    };


    return (
    <div className = "note new" >
        <textarea
            rows = '2'
            cols ='10'
            placeholder = 'Title' 
            name = "title"
            value = {noteText.title}
            onChange={handleChange}
        ></textarea>
        <textarea
            rows = '8'
            cols ='10'
            placeholder = 'Type to add new note' 
            name = "content"
            value = {noteText.content}
            onChange={handleChange}
        ></textarea>
        <div className = 'note_footer'>
            <small>New Note</small>
            <button className = "save" onClick={handleSaveClick}>Save</button>
        </div>

    </div>)
}

export default AddNote;