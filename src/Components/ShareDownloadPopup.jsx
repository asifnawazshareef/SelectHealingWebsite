import { useState } from "react";
import {
  FaRegFolderOpen,
  FaDropbox,
  FaGoogleDrive,
  FaLink,
  FaDownload,
} from "react-icons/fa6";
import { Button } from "@/ui/button";
import { RiShareForwardLine } from "react-icons/ri";
const ShareDownloadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Button
        onClick={togglePopup}
        variant="outline"
        className="flex items-center gap-2 rounded-full text-black"
      >
        <RiShareForwardLine />
        Share
      </Button>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 sm:p-10 w-11/12 max-w-4xl relative shadow-lg animate-fadeIn">
            <section className="flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                  Share download
                </h2>
                <button
                  onClick={togglePopup}
                  className="font-medium text-lg text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col justify-center items-center gap-1  md:gap-3 lg:gap-5">
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#FE8E66] shadow-lg">
                  <FaDownload className="text-white w-12 h-12" />
                </div>
                <h1 className=" text-xl font-bold text-gray-800 md:text-3xl text-center">
                  Almost there!
                </h1>
                <p className="text-center text-gray-600 text-sm md:text-base max-w-lg">
                  It looks like there are no offers attached to this download,
                  Once one is set up, sharing options will show here.
                </p>
                <Button variant="link" className="underline">
                  Create an offer
                </Button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareDownloadPopup;
