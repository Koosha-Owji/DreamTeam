import Note from "./Note";
import "./note.css";

const NoteList = ({ notes, handleDeleteNote, setCurrentId }) => {
  return !Array.isArray(notes) ? (
    <tr>You have No Notes! Create one using New Note</tr>
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

export default NoteList;
