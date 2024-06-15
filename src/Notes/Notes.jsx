import { useState, useEffect } from "react";
import axios from "axios";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import NoteSearch from "./NoteSearch";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/notes/note`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (noteData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/notes/note`,
        noteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const editNote = async (id, title, content) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/notes/note/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredNotes = () => {
    if (!searchQuery) {
      return notes;
    }
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const nonMatchingNotes = notes.filter(
      (note) =>
        !note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return [...filteredNotes, ...nonMatchingNotes];
  };

  
  const filteredNotes = getFilteredNotes();
  const totalCount = notes.length;

  return (
    <div className="flex items-center justify-center">
      <div className=" shadow-md rounded-lg w-[703px] h-[480px] p-[36px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} >
        <h1 className="text-3xl font-bold text-[white] mb-4 text-center">NOTES</h1>
        <NoteSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        {totalCount === 0 ? (
          <div>
            <div className="flex flex-col items-center justify-center h-64">
              <img
                src="./Frame8.png"
                alt="No todos"
                className="h-[220px] w-[250px]"
              />
            </div>
            <div className="flex justify-end mt-4">
              <NoteForm onSubmit={addNote} />
            </div>
          </div>
        ) : (
          <>
            <div
              className="mt-4 max-h-60 overflow-y-auto overflow-x-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <NoteList notes={filteredNotes} onDelete={deleteNote} onEdit={editNote} />
            </div>

            <div className="flex justify-end mt-4">
              <NoteForm onSubmit={addNote} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
