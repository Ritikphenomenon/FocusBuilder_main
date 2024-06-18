import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-neutral-800 bg-opacity-50" onClick={onClose}></div>
      <div className="relative rounded-lg shadow-lg p-2 z-10">
        <button
          className="absolute top-8 right-7 text-white rounded-[29px]   z-20 bg-black w-[24px] h-[24px] "
          onClick={onClose}
        >
        <img src="./icons/cancel.png" alt="no image" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
