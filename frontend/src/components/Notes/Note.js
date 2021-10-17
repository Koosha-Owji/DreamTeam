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
      <textarea
        rows="2"
        cols="10"
      >{title}</textarea>
      <textarea
        rows="8"
        cols="10"
      >{text}</textarea>
      <div className="note_footer">
        <textarea>{meetingTitle}</textarea>
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