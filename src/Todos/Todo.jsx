import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoSearch from './TodoSearch';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos/todo`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [token]);

  const handleAddTodo = async (description) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/todos/todo`, { description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/todos/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCompleteTodo = async (id, completed) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/todos/todo/${id}`, { completed }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(todos.map(todo => todo._id === id ? { ...todo, completed } : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const moveTodoUp = (index) => {
    if (index === 0) return;
    const updatedTodos = [...todos];
    const [todo] = updatedTodos.splice(index, 1);
    updatedTodos.splice(index - 1, 0, todo);
    setTodos(updatedTodos);
  };

  const moveTodoDown = (index) => {
    if (index === todos.length - 1) return;
    const updatedTodos = [...todos];
    const [todo] = updatedTodos.splice(index, 1);
    updatedTodos.splice(index + 1, 0, todo);
    setTodos(updatedTodos);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredTodos = () => {
    if (!searchQuery) {
      return todos;
    }
    const filteredTodos = todos.filter(todo =>
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const nonMatchingTodos = todos.filter(todo =>
      !todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return [...filteredTodos, ...nonMatchingTodos];
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="  rounded-lg   w-[713px] h-[460px]  relative  backdrop-blur-lg mb-4 py-4 "   style={{
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)",
    }}>
      <h1 className="text-2xl font-bold mb-3  text-center text-white">TODO LIST</h1>
      <TodoSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}  />
      {totalCount === 0 ? (
        <div>
        <div className="flex flex-col justify-center items-center ">
          <img src="./Frame8.png" alt="No todos" className="h-[200px] w-[240px] mt-16 " />
          <div className="absolute bottom-7 right-7">
            <TodoForm onAddTodo={handleAddTodo} />
          </div>
          </div>
          <hr className="mt-10 " />
          <div className="mt-1 text-sm ml-3 text-white">
            Completed {completedCount} out of {totalCount}
          </div>
          </div>
       
      ) : (
        <>
          <div className="mt-3 h-[250px] overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo._id}
                index={index}
                todo={todo}
                onDelete={handleDeleteTodo}
                onComplete={handleCompleteTodo}
                onMoveUp={() => moveTodoUp(index)}
                onMoveDown={() => moveTodoDown(index)}
              />
            ))}
          </div>

          <div className="absolute bottom-8 right-3">
            <TodoForm onAddTodo={handleAddTodo} />
          </div>

          <hr className="mt-14" />
          <div className="mt-1 text-sm ml-3 text-white">
            Completed {completedCount} out of {totalCount}
          </div>
        </>
      )}
    </div> 
  );
};

export default Todo;
