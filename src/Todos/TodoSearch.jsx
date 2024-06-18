import  { useState } from 'react';


const TodoSearch = ({ searchQuery, setSearchQuery, handleSearch }) => {


    const [search,setSearch]=useState('');
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    handleSearch();
  };

  return (
    <form className="flex mb-4 ml-6" onSubmit={handleSubmit}>

      <input
        type="text"
        className="w-[577px] h-[44px] text-white rounded-[8px] border border-[#D1D1D1] p-[14px 16px] gap-[10px] bg-neutral-800 p-2 focus:border-blue-500 focus:outline-none"
        placeholder="Search a task"
        value={search}
        onChange={handleChange}
        style={{ height: "44px" }}
      />

      <button type="submit" className="ml-3 px-4 bg-blue-700 text-white rounded-md " style={{ height: "44px" }}>
        Search
      </button>

    </form>
  );
};

export default TodoSearch;
