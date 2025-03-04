import React from "react";
import { ClipLoader } from "react-spinners";

const Modal = ({ isOpen, onClose, title, children, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <ClipLoader color="#4A90E2" size={35} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Modal;
