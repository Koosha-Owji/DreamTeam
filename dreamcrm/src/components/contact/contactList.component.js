import AddNote from './addContact.component'

const ContactList = ({notes , handleAddContact}) => {
    return (
        <div className = "noteList">
            {notes.map((notes) => (
                <Note Id = {notes.Id} title = {notes.title}
                    meetingId = {notes.meetingId} text = {notes.text}
                    handleDeleteNote = {handleDeleteNote}/>
            ))}
                
            <AddContact handleAddContact = {handleAddContact}/>
        </div>

        
    );
}; 

export default ContactList