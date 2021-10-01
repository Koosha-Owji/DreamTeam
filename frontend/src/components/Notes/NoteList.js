/**
 * NoteList.js, takes notes component and the required fucntions from the NotePages, and sends individual 
 * note attributes to the note.js file
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */
import Note from "./Note";

/**
 * For every note in notes list, create a new Note component with the available attributes 
 * and passing it with all the required functionalities
 * @param {a list of notes retrieved from the database} notes 
 * @param {a function that handles when the notes click the delete button} handleDeleteNote
 * @param {a fucntion that sets the currentId to be the id of the note being edited} setCurrentId 
 * @returns {a list of Note components to be rendered} 
 */
const NoteList = ({ notes, handleDeleteNote, setCurrentId }) => {
  return !Array.isArray(notes) ? (
    "you have no notes"
  ) : (
    <div className="noteList">
      {notes.map((note) => (
        <Note
          Id={note._id}
          title={note.title}
          meetingId={note.meetingId}
          text={note.content}
          handleDeleteNote={handleDeleteNote}
          setCurrentId={setCurrentId}
        />
      ))}
    </div>
  );
};

export default NoteList;
