import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FallingLines } from "react-loader-spinner";
const LoaderModal = ({ isOpenLoader, openModalLoader, closeModalLoader }) => {
  const isDarkmode = useSelector((state) => state.darkmode.isDarkmode);
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
              className={`relative flex justify-center items-center ${
                isDarkmode ? "bg-black text-white " : " bg-white "
              }  rounded-lg shadow dark:bg-gray-700`}
            >
              {" "}
              <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoaderModal;
