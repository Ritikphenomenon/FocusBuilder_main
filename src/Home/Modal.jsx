// src/components/Modal.js


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50  ">
      <div className=" rounded-lg shadow-lg relative ">
        <button
          className="absolute top-2 right-2 text-white rounded-full p-1 z-50 "
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
