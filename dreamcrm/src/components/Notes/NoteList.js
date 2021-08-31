import Note from './Note'
import AddNote from './AddNote'
import { useSelector } from 'react-redux'

const NoteList = ({notes , handleAddNote, handleDeleteNote}) => {
    notes = useSelector((state) => state.note);
    return (
        
        <div className = "noteList">
            {notes.map((notes) => (
                <Note Id = {notes.Id} title = {notes.title}
                    meetingId = {notes.meetingId} text = {notes.content}
                    handleDeleteNote = {handleDeleteNote}/>
            ))}
            <AddNote handleAddNote = {handleAddNote}/>
        </div>

        
    );
}; 

export default NoteList
