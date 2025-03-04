import { Button } from "@/ui/button";
import { GoDesktopDownload } from "react-icons/go";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Downloads = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 ">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#ff9970] shadow-lg">
        <GoDesktopDownload className="text-white w-10 h-10" />
      </div>
      <h1 className="mt-8 font-bold text-gray-800 text-lg sm:text-xl md:text-3xl text-center">
        Create your first download
      </h1>
      <p className="mt-4 text-center text-gray-600 text-sm md:text-base max-w-lg">
        Upload files to make your content available for download and start
        monetizing your audience.
      </p>
      <div className="flex gap-3">
        <Link to="/add-download">
          <Button className="mt-8 bg-black text-white text-sm md:text-base p-4 md:p-6 rounded-full outline-none transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            Get Started
          </Button>
        </Link>
        <Button className="mt-8 bg-white text-black hover:text-white text-sm md:text-base p-4 md:p-6 rounded-full outline-none transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Learn more
        </Button>
      </div>
    </div>
  );
};

export default Downloads;
