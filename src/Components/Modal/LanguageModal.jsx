import React, { useState } from "react";
import Tick from "../../assets/icons/Tick.svg";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../features/language/languageSlice";

const LanguageModal = ({ isLanguageOpen, closeLanguageModal }) => {
  const [selectedValue, setSelectedValue] = useState("English");
  const handleSelect = (value) => {
    setSelectedValue(value);
  };
  const dispatch = useDispatch();

  return (
    <div>
      {isLanguageOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Language</h3>
                <button
                  type="button"
                  onClick={closeLanguageModal}
                  className="bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <ul className="py-2 text-sm">
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      handleSelect("English");
                      dispatch(setLanguage("en"));
                    }}
                    className={`flex justify-between h-[40px] pe-5 px-4 py-2`}
                  >
                    English
                    {selectedValue === "English" && <img src={Tick} alt="" />}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      handleSelect("Spanish");
                      dispatch(setLanguage("sp"));
                    }}
                    className={`flex justify-between items-center h-[40px] pe-5 px-4 py-2`}
                  >
                    Spanish
                    {selectedValue === "Spanish" && <img src={Tick} alt="" />}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      handleSelect("French");
                      dispatch(setLanguage("fr"));
                    }}
                    className={`flex justify-between items-center h-[40px] pe-5 px-4 py-2`}
                  >
                    French
                    {selectedValue === "French" && <img src={Tick} alt="" />}
                  </a>
                </li>
              </ul>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  onClick={closeLanguageModal}
                  className="text-white bg-[#CCAA5A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageModal;
