import { useState } from "react";

const NoteForm = ({ onSubmit, initialValue = {} }) => {
  const [title, setTitle] = useState(initialValue.title || "");
  const [content, setContent] = useState(initialValue.content || "");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle("");
    setContent("");
    setIsModalVisible(false); // Hide the modal after submitting
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };
  
  return (
    <>
      <div className="flex items-center mb-4" >
        <img
          src="/add_circle.png"
          alt="add"
            className="bg-blue-500"
          onClick={toggleModalVisibility}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "40px",
            cursor: "pointer",
            opacity: isModalVisible ? 2 : 4,
            pointerEvents: "auto",
            gap: "10px",
            padding: "4px"
          }}
        />

        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-[551px] h-[400px]  mx-1 gap-[10px] flex flex-col"  >
              <h2
                className="font-sans font-bold text-2xl leading-8 text-white text-center mb-3"
                style={{ fontFamily: "Montserrat" }}
              >
                NEW NOTE
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col flex-grow space-y-4"
              >
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-blue-500 rounded-md pt-[8px] pr-[16px] pb-[8px] pl-[16px] py-2 w-[503px] h-[38px] gap-[436px]
                  text-white bg-gray-800 font-semibold"
                  placeholder="Heading"
                />
                <textarea
                  placeholder="Write Here Your Work"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border pt-[8px] pr-[16px] pb-[8px] pl-[16px] py-2
                  bg-gray-800  rounded-md  mb-8 w-[503px] h-[137px] text-white font-thin "
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none"  }}
                 
                ></textarea>

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
                    className="bg-[#6B63FF] w-[85px] h-[44px] rounded-md px-5 py-2 text-white"
                  >
                    APPLY
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NoteForm;
