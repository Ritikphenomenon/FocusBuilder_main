import  { useState } from "react";

const Note = ({ id, initialTitle, initialContent, onDelete, onSave }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(id, title, content);
  };

  return (
    <div className="w-[327px] h-[170px] border #FFFFFF rounded-[14px]  gap-4 p-4 shadow-md " style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <div className="flex">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[261.4px] h-[26px] font-inter font-medium text-[18.4px] leading-[25.76px] text-[white] " style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        />
        <img
          src="/delete.png"
          className=" size-7 cursor-pointer "
          onClick={() => onDelete(id)}
          alt="del"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        />
        <img
          src="/save.png"
          className="size-7 cursor-pointer "
          onClick={handleSave}
          alt="del"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-[299.4px] h-[84px] opacity-80 text-[white] font-inter font-normal text-[14px] leading-[13.92px] resize-none overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", backgroundColor: 'rgba(0, 0, 0, 0.8)'  }}
    
        rows={5}
      />
     
    </div>
  );
};

export default Note;
