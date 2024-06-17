import React from 'react';

const TodoItem = ({ todo, index, onDelete, onComplete, onMoveUp, onMoveDown }) => {
  const handleDelete = () => {
    onDelete(todo._id);
  };

  const handleComplete = () => {
    onComplete(todo._id, !todo.completed);
  };

  const handleMoveUp = () => {
    onMoveUp(index);
  };

  
  const handleMoveDown = () => {
    onMoveDown(index);
  };

  return (
    <div className="flex items-center justify-between h-[26px] mb-[24px] w-[660px] ml-8 ">
     
     <div className='flex items-center flex-1 overflow-y-auto'>
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={handleComplete}
    className="  mr-2 w-[20px] h-[20px]"
  />
  <span className={todo.completed ? 'line-through' : 'font-montserrat font-normal text-base leading-1 text-white'}>
    {todo.description}
  </span>
</div>


      <div className="flex items-center gap-2">
        <button onClick={handleMoveUp} className="text-white">
          <img className="w-[14px] h-[20px]" src="/up_arrow.png" alt="Move Up" />
        </button>
        <button onClick={handleMoveDown} className="text-gray-500">
          <img className="w-[14px] h-[20px]" src="/down_arrow.png" alt="Move Down" />
        </button>
        <button onClick={handleDelete} className="text-red-500">
          <img className="w-[18px] h-[18px]" src="/delete.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
