import Note from './Note'
const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div className=" ml-2 grid grid-cols-2  gap-y-4">
      {notes.map(note => (
        <Note
          key={note._id}
          id={note._id}
          initialTitle={note.title}
          initialContent={note.content}
          onDelete={onDelete}
          onSave={onEdit}
        />
      ))}
    </div>
  );
};

export default NoteList;
