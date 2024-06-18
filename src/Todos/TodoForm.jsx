import { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAddTodo(description.trim());
    setDescription("");
    setIsModalVisible(false); // Hide the modal after submitting
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="flex items-center mb-4" >
      <img
        src="/add_circle.png"
        alt="add"
        className="bg-blue-700"
        onClick={toggleModalVisibility}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "40px",
          cursor: "pointer",
          opacity: isModalVisible ? 2 : 4,
          pointerEvents: "auto",
          gap: "10px",
          padding: "12px"
        }}
      />

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-neutral-800 rounded-lg p-6 w-[488px] h-[262px] max-w-md mx-2 flex flex-col">
            <h2
              className="font-sans font-bold text-2xl leading-8 text-white text-center mb-3"
              style={{ fontFamily: "Montserrat" }}
            >
              New Todo
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-grow  space-y-4"
            >
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md px-4 py-2 w-full bg-neutral-800 text-white focus:border-blue-500 focus:outline-none "
                placeholder="Input your todos...."
              />
              <div className="flex-grow"></div> {/* Spacer element */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleModalVisibility}
                  className="w-[98px] h-[44px] rounded-md border border-[#D40000] px-5 py-2 text-[#D40000] gap-2.5"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 w-[85px] h-[44px] rounded-md px-5 py-2 text-white"
                >
                  APPLY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
