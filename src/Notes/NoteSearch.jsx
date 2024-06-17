import React, { useState } from 'react';

const NoteSearch = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    handleSearch();
  };

  return (
    <form className="flex w-full mb-4 " onSubmit={handleSubmit}>
      <input
        type="text"
        className="border p-2 flex-grow h-11 rounded-md px-4 py-2 w-full text-white focus:border-blue-500 focus:outline-none"
        placeholder="Search a Note.."
        value={search}
        onChange={handleChange}
        style={{ height: '44px', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      />

      <button
        type="submit"
        className="ml-1 px-4 bg-blue-500 text-white rounded-md"
        style={{ height: '44px' }}
      >
        Search
      </button>
    </form>
  );
};

export default NoteSearch;
