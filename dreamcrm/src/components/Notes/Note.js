import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';

const Note = ({Id, title, meetingId, text, handleDeleteNote}) => {
    
    // const handleEditNote = ()  => {
    // return (
    //     <textarea
    //         rows = '2'
    //         cols ='10'
    //         placeholder = 'Title' 
    //         name = "title"
    //         value = {noteText.title}
    //         onChange={handleChange}
    //     ></textarea>
    //     <textarea
    //         rows = '8'
    //         cols ='10'
    //         placeholder = 'Type to add new note' 
    //         name = "content"
    //         value = {noteText.content}
    //         onChange={handleChange}
    //     ></textarea>
    // )}
    
    
    return (
        <div className = 'note'>
            <MdModeEdit 
                cursor = 'pointer' 
                className = 'edit_icon' 
                size = '1.3em'
            />
            <h2>{title}</h2>
            <textarea rows = '10'>{text}</textarea>
            <div className = 'note_footer'>
                <small>{meetingId}</small>
                <MdDelete  
                onClick = {() => handleDeleteNote(Id)}
                className = 'delete_icon' size = '1.3em'
               />
            </div>
        </div>
    );
};

export default Note