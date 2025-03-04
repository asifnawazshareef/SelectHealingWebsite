import React from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const LoaderModal = ({ isOpenLoader }) => {
  return (
    <div>
      {isOpenLoader && (
        <div
          id="popup-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <div
              className={`relative flex justify-center items-center 
            
               rounded-lg shadow `}
            >
              <ClipLoader color="#4fa94d" size={50} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderModal;
