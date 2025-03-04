import { useState } from "react";
import {
  FaRegFolderOpen,
  FaDropbox,
  FaGoogleDrive,
  FaLink,
} from "react-icons/fa6";
import { Button } from "@/ui/button";
import { IoClose } from "react-icons/io5";
const FileUploadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Button
        onClick={togglePopup}
        className="mt-4 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-all ease-in-out"
      >
        Add files
      </Button>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 sm:p-10 w-11/12 max-w-4xl relative shadow-lg animate-fadeIn">
            <section className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xxl sm:text-2xl font-semibold text-gray-800">
                  Upload File
                </h2>
                <button
                  onClick={togglePopup}
                  className="font-medium text-lg text-gray-600 hover:text-gray-800"
                >
                  {/* Close &times; */}
                  <IoClose />
                </button>
              </div>
              <div className="border-dashed border-2 px-4 py-6 sm:py-10 rounded-xl border-gray-300 bg-gray-100 flex flex-col items-center gap-5">
                <h3 className="text-center text-xl sm:text-2xl font-medium text-gray-800">
                  Drop files here, &nbsp;
                  <span className="text-blue-600 border-b border-blue-300 cursor-pointer">
                    browse files &nbsp;
                  </span>
                  or import from:
                </h3>
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg sm:max-w-2xl">
                  <div className="group flex flex-col items-center justify-center gap-4 p-5 bg-white border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-blue-500 text-white rounded-full p-3 group-hover:bg-blue-600">
                      <FaRegFolderOpen size={30} />
                    </div>
                    <h4 className="font-medium text-gray-700">My Device</h4>
                  </div>
                  {/* <div className="group flex flex-col items-center justify-center gap-4 p-5 bg-white border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-gray-800 text-white rounded-full p-3 group-hover:bg-black">
                      <FaDropbox size={30} />
                    </div>
                    <h4 className="font-medium text-gray-700">Dropbox</h4>
                  </div> */}
                  {/* <div className="group flex flex-col items-center justify-center gap-4 p-5 bg-white border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-blue-400 text-white rounded-full p-3 group-hover:bg-blue-500">
                      <FaGoogleDrive size={30} />
                    </div>
                    <h4 className="font-medium text-gray-700">Google Drive</h4>
                  </div> */}
                  <div className="group flex flex-col items-center justify-center gap-4 p-5 bg-white border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-orange-500 text-white rounded-full p-3 group-hover:bg-orange-600">
                      <FaLink size={30} />
                    </div>
                    <h4 className="font-medium text-gray-700">Link</h4>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUploadPopup;
