import Note from './Note'

const NoteList = ({notes , handleDeleteNote, setCurrentId}) => {
    return !Array.isArray(notes) ? (
      "you have no notes"
    ) : (
      <div className="noteList">
        {notes.map((note) => (
          <Note
            Id={note._id}
            title={note.title}
            meetingTitle={note.meeting_title}
            text={note.content}
            handleDeleteNote={handleDeleteNote}
            setCurrentId={setCurrentId}
          />
        ))}
      </div>
    );
};

export default NoteList
