// src/pages/Home.js

import { useState } from "react";
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
          <Music />
          <VideoPlayer />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">

        <div
          className=" 
         
          w-[479.04px] 
        h-[74.37px]  rounded-[24px]  
        border-[0.5px] 
        border-white 
        p-[8px] 
        px-[12px] 
        gap-[8px] 
         bg-stone-600
         "
        >
          <div className="flex justify-center gap-4">
            <div
              className="
              relative group 
              rounded-lg bg-opacity-20 cursor-pointer"
              onClick={() => openModal(<Notes />)}
            >
              <img src="./icons/Notes.png" alt="Notes" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black text-white text-s px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 ">
        Notes
      </span>
            </div>

            <div
              className="
              relative group
              mt-1.5
              w-[48.51px] 
              h-[48.51px] 
              rounded-[10.8px]
              p-0.5
              cursor-pointer
            "
              style={{
                transform: "rotate(-0.12deg)",
                background: "linear-gradient(0deg, #273631 100%, #0F1315 100%)",
                boxShadow:
                  "2.47px 7.42px 27.48px -3.57px rgba(22, 52, 80, 0.1)",
              }}
              onClick={() => openModal(<PomodoroClock />)}
            >
              <img src="./icons/Clock.png" alt="Clock" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black text-white text-s px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 ">
        Pomodoro
      </span>
            </div>

            <div
              className="
              relative group
             w-[46.08px] 
             h-[46.08px] 
             rounded-[92.16px]
             mt-1
             cursor-pointer
           "
              style={{
                background: "linear-gradient(0deg, #FBFBFF 100%, #CACAFF 100%)",
              }}
              onClick={() => openModal(<Chatgpt />)}
            >
              <img src="./icons/chatgpt.jpg" alt="logo" className="  h-24  " />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black text-white text-s px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 ">
        ChatGPT
      </span>
            </div>

            <div
              className="
              relative group
               w-[46.08px] 
               h-[46.08px] 
               rounded-[92.16px]
               mt-1
               cursor-pointer
             "
              style={{
                background: "linear-gradient(0deg, #FBFBFF 100%, #CACAFF 100%)",
              }}
              onClick={() => openModal(<BirdGame />)}
            >
              <img
                src="./icons/game.png"
                alt="Weather"
                className="
                w-[46.08px] 
                h-[46.08px] 
                rounded-[92.16px]
              "
              />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black text-white text-s px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 ">
        Game
      </span>
            </div>

            <div
              className="
              relative group
              w-14 h-14 rounded-lg bg-opacity-20 cursor-pointer"
              onClick={() => openModal(<Todo />)}
            >
              <img src="./icons/Todo.png" alt="Todo" className="w-14 h-14" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black text-white text-s px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 ">
       Todos
      </span>
            </div>

            <div
              className="

              relative group
              w-[45.51px] h-[45.51px] rounded-[10.8px] bg-white cursor-pointer pl-1 pt-1
              mt-1"
              style={{
                transform: "rotate(-0.12deg)",
                boxShadow:
                  "2.47px 7.42px 27.48px -3.57px rgba(22, 52, 80, 0.1)",
              }}
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <img src="./icons/theme.png" alt="Theme" />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black text-white text-s px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 ">
        Theme
      </span>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>

      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-backdrop">
          <Background option={option} setOption={setOption} />
          <button></button>
        </form>
      </dialog>
    </div>
  );
}

export default Home;
