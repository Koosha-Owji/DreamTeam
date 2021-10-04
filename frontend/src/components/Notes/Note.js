import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';

const Note = ({
  Id,
  title,
  meetingTitle,
  text,
  handleDeleteNote,
  setCurrentId,
}) => {
  return (
    <div className="note">
      <MdModeEdit
        cursor="pointer"
        className="edit_icon"
        size="1.3em"
        onClick={() => setCurrentId(Id)}
      />
      <h2>{title}</h2>
      <pre>{text}</pre>
      <div className="note_footer">
        <small>{meetingTitle}</small>
        <MdDelete
          onClick={() => handleDeleteNote(Id)}
          className="delete_icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note