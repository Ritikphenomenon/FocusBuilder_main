// src/pages/Home.js

import  { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Weather from "./Weather";
import Background from "../Theme/Background";
import { backgroundList } from "../utils/data";
import Modal from "./Modal";
import Chatgpt from "../Chatgpt/Chatgpt";
import Notes from "../Notes/Notes";
import Todo from "../Todos/Todo";
import Music from "../Music/music";
import BirdGame from "../Games/Bird";
import VideoPlayer from "./VideoPlayer";
import PomodoroClock from "../Pomodoro/Pomodoroclock";

function Home() {
  const [option, setOption] = useState(backgroundList[0]?.url);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="fixed h-screen">
      <div
        className="grid grid-cols-3 h-full bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${option}')` }}
      >
        <Navbar />
        <Weather />
        
        <div className="flex flex-col mt-8  space-y-4">
  <Music  />
  <VideoPlayer />
</div>

      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-96 h-16 rounded-lg border border-gray-300 p-2 space-x-2 bg-opacity-20 bg-white items-end">
          <div className="flex justify-center gap-2">
            <div
              className="w-15 h-14 rounded-lg bg-opacity-20 cursor-pointer"
              onClick={() => openModal(<Notes />)}
            >
              <img src="./icons/Notes.png" alt="Notes" className="h-14 w-15" />
            </div>

            <div
              className="w-15 h-16 rounded-lg bg-opacity-20 cursor-pointer"
              onClick={() => openModal(<PomodoroClock />)}
            >
              <img src="./icons/Clock.png" alt="Clock" className="h-16" />
            </div>

            <div
              className="w-15 h-14 rounded-lg bg-opacity-20 flex items-center justify-center cursor-pointer"
              onClick={() => openModal(<Chatgpt />)}
            >
              <img
                src="./icons/chatgpt.png"
                alt="ChatGPT"
                className="object-cover h-11 w-12"
              />
            </div>

            <div
              className="w-14 h-12 rounded-lg bg-opacity-20 cursor-pointer"
              onClick={() => openModal(<BirdGame />)}
            >
              <img
                src="./icons/game.png"
                alt="Weather"
                className="w-13 h-11 mt-1"
              />
            </div>

            <div
              className="w-14 h-14 rounded-lg bg-opacity-20 cursor-pointer"
              onClick={() => openModal(<Todo />)}
            >
              <img src="./icons/Todo.png" alt="Todo" className="w-14 h-14" />
            </div>

            <div
              className="w-14 h-14 rounded-lg bg-opacity-20 cursor-pointer"
              onClick={() =>
                openModal(<Background option={option} setOption={setOption} />)
              }
            >
              <img
                src="./icons/theme.png"
                alt="Theme"
                className="w-14 h-14"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default Home;
