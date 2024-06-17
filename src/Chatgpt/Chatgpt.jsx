import { useState } from "react";
import axios from "axios";
import useUserProfile from '../Navbar/useUserProfile';

function Chatgpt() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const userProfile = useUserProfile();

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer...  It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEM_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-lg relative w-[703px] h-[480px] p-[36px] mb-7" style={{
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)",
    }}>
      <div className="  gap-1 rounded  flex flex-col">
        <div className="flex justify-center mt-2">
          <img src="/Frame44.png" alt="logo" className="mt-1 w-20 h-20" />
          <p className="text-2xl w-28 h-8 font-montserrat text-white ml-2">ChatGPT</p>
        </div>

        {answer !== "" ? (
          <div className="flex items-start w-auto h-12">
            <img src={userProfile.profilePhoto} alt="icon" className="w-10 h-10 rounded-full mr-6 mt-1 mb-1" />
            <p className="w-[570px] h-12 text-white bg-neutral-800 p-2 overflow-hidden rounded mr-2">{question}</p>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex-grow flex flex-col justify-center items-center mt-3">
          {answer !== "" ? (
            <textarea
              className="w-[555px] h-48 rounded p-2 bg-neutral-800  resize-none  text-sm leading-5 font-inter font-normal text-white ml-14"
              value={answer}
              readOnly
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            />
          ) : (
            <div className="flex justify-center mb-4">
              <img src="/bg_chat.png" className="w-40 h-60" alt="thund" />
            </div>
          )}

          <form onSubmit={generateAnswer} className="w-full text-center mt-auto">
            <div className="flex w-[600px] h-12 gap-8 justify-center items-center  mt-8 ml-7">
              <input
                type="text"
                required
                className=" p-3 w-[450px] h-12 rounded-full bg-neutral-800 text-white ml-9"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything"
              />
              <button
                type="submit"
                className="w-30 h-12 rounded-full px-6 py-1 bg-blue-500 text-white "
                disabled={generatingAnswer}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-end mt-2 h-8 text-xs font-jakarta-sans font-sm  text-gray-300 mr-8">
          Free Research Preview. ChatGPT may produce inaccurate information. <span className="font-montserrat text-gray-400 underline">ChatGPT May 12 Version</span>
        </div>
      </div>
    </div>
  );
}

export default Chatgpt;
