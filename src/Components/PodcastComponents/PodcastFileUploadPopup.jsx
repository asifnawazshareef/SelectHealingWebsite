import { useState } from "react";
import {
  FaRegFolderOpen,
  FaDropbox,
  FaGoogleDrive,
  FaLink,
  FaCamera,
} from "react-icons/fa6";
import { Button } from "@/ui/button";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
const PodcastFileUploadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Button
        onClick={togglePopup}
        className="py-1 px-4 text-gray-900 bg-gray-300 hover:bg-gray-400 rounded-full text-sm font-medium "
      >
        Upload an Image
        <RiArrowDropDownLine />
      </Button>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 sm:p-10 w-11/12 max-w-4xl h-[90vh] relative shadow-lg animate-fadeIn">
            <section className="flex flex-col gap-6 h-full">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Upload File
                </h2>
                <button
                  onClick={togglePopup}
                  className="font-medium text-lg text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  {/* <span>Close</span>  */}
                  <IoClose />
                </button>
              </div>
              <div className="border-dashed border-2 px-4 py-6 sm:py-10 rounded-xl border-gray-300 h-full flex flex-col items-center justify-center gap-5">
                <h3 className="text-center text-xl sm:text-2xl font-medium text-gray-800">
                  Drop files here,&nbsp;
                  <span className="text-blue-600 border-b border-blue-300 cursor-pointer">
                    browse files&nbsp;
                  </span>
                   or import from:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-lg sm:max-w-2xl">
                  <div className="group flex flex-col items-center justify-center gap-3 p-3 bg-white border-2 border-black rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-blue-500 text-white rounded-full p-2 group-hover:bg-blue-600">
                      <FaRegFolderOpen size={24} />
                    </div>
                    <h4 className="font-medium text-sm text-gray-700">My Device</h4>
                  </div>
                  <div className="group flex flex-col items-center justify-center gap-3 p-3 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-gray-800 text-white rounded-full p-2 group-hover:bg-black">
                      <FaDropbox size={24} />
                    </div>
                    <h4 className="font-medium text-sm text-gray-700">Dropbox</h4>
                  </div>
                  <div className="group flex flex-col items-center justify-center gap-3 p-3 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-blue-400 text-white rounded-full p-2 group-hover:bg-blue-500">
                      <FaGoogleDrive size={24} />
                    </div>
                    <h4 className="font-medium text-sm text-gray-700">Google Drive</h4>
                  </div>
                  <div className="group flex flex-col items-center justify-center gap-3 p-3 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-orange-500 text-white rounded-full p-2 group-hover:bg-orange-600">
                      <FaLink size={24} />
                    </div>
                    <h4 className="font-medium text-sm text-gray-700">Link</h4>
                  </div>
                  <div className="group flex flex-col items-center justify-center gap-3 p-3 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                    <div className="bg-purple-500 text-white rounded-full p-2 group-hover:bg-purple-600">
                      <FaCamera size={24} />
                    </div>
                    <h4 className="font-medium text-sm text-gray-700">Camera</h4>
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

export default PodcastFileUploadPopup;
