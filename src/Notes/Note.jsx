import  { useState } from "react";

const Note = ({ id, initialTitle, initialContent, onDelete, onSave }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(id, title, content);
  };

  return (
    <div className="w-[327px] h-[170px] border #FFFFFF rounded-[14px]   p-4 shadow-md bg-neutral-800 " >
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[261.4px] h-[26px] font-inter font-medium text-[18.4px] leading-[25.76px] text-[white] mb-2 mr-4
          bg-neutral-800 " 
        />
        <img
          src="/delete.png"
          className=" size-6 cursor-pointer bg-neutral-800 mr-1  "
          onClick={() => onDelete(id)}
          alt="del"
          
        />
        <img
          src="/save.png"
          className="size-6 cursor-pointer bg-neutral-800 "
          onClick={handleSave}
          alt="save"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-[299.4px] h-[84px] opacity-80 text-[white] font-inter font-normal text-[14px] leading-[13.92px] resize-none overflow-y-auto bg-neutral-800"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    
        rows={5}
      />
     
    </div>
  );
};

export default Note;
