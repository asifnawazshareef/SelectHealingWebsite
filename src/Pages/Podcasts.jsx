import { Button } from "@/ui/button";
import { Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Podcasts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center px-5 min-h-screen">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#ff9970] shadow-lg">
        <Mic className="text-white w-10 h-10" />
      </div>
      <h1 className="mt-6 font-bold text-gray-800 text-lg sm:text-xl md:text-3xl text-center">
        Create your podcast
      </h1>
      <p className="mt-6 text-center text-gray-600 text-sm md:text-base max-w-lg">
        Create and publish episodes, distribute to all major listening apps, and
        monetize your podcast — all from your dashboard.
      </p>
      <Link to="/add-podcast">
        <Button className="mt-6 bg-black text-white text-sm md:text-base p-4 md:p-6 rounded-full outline-none transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default Podcasts;
