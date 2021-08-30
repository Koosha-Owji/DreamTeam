import Note from './Note'
import AddNote from './AddNote'

const NoteList = ({notes , handleAddNote, handleDeleteNote}) => {
    return (
        <div className = "noteList">
            {notes.map((notes) => (
                <Note Id = {notes.Id} title = {notes.title}
                    meetingId = {notes.meetingId} text = {notes.text}
                    handleDeleteNote = {handleDeleteNote}/>
            ))}
                
            <AddNote handleAddNote = {handleAddNote}/>
        </div>

        
    );
}; 

export default NoteList
