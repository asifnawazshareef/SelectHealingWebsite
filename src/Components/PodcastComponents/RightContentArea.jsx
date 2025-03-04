import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { PlayIcon } from "lucide-react";

const RightContentArea = ({ data ,title, description, author}) => {
  return (
    <div className="border rounded-b-xl my-auto flex flex-col shadow-md">
      <div className=" bg-gray-100  p-5 mb-6">
        <div className="flex gap-5 ">
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 px-10 mb-2">
        <Skeleton className="h-3 w-24 rounded-full" />
        <div className="flex flex-wrap ml-auto  lg:ml-8 2xl:ml-auto sm:ml-10 gap-6 mb-6">
          <Skeleton className="h-2 w-16 rounded-full " />
          <Skeleton className="h-2 w-16 rounded-full" />
          <Skeleton className="h-2 w-16 rounded-full" />
          <Skeleton className="h-2 w-16 rounded-full" />
          <Skeleton className="h-2 w-16 rounded-full" />
        </div>
      </div>

      <div className="bg-[#f8fafb] flex justify-center items-center p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-lg">
          <Skeleton className="h-40 w-40 bg-[#7254af]" />
          <div className="h-40 flex flex-col justify-between">
            <h2 className="text-xl font-semibold">
              {title || "Podcast Title"}
            </h2>
            <h2 className="text-xl font-semibold">
              {author || "Hosted By"}
            </h2>
            <p className="">
              {description ||
                "Short description that tells what the podcast is about."}
            </p>
            <button className="mt-4 px-10 py-4 w-20 bg-[#725cbb] rounded-full font-medium">
              {data.buttonColor}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white flex items-center px-10 sm:px-20 md:px-28 lg:px-36 xl:px-48 py-5">
        <div className="w-[520px]">
          <h2 className="text-sm text-left font-semibold mb-1.5">Episodes</h2>
          <div className="bg-[#7254af] p-5 flex flex-col">
            <div className="flex gap-2 md:gap-4">
              <Skeleton className="h-28 w-28 bg-[#c4b8db]" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-2 w-24 rounded-full bg-white " />
                <Skeleton className="h-3 w-48 rounded-full bg-[#bcb1d3]" />
                <Skeleton className="h-2 w-44 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="flex justify-center mt-4 px-10 py-1 w-28 bg-[#ffff] rounded-full font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7254af"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M5 3.868v16.264c0 .851.907 1.354 1.657.927l14.658-8.132a1 1 0 000-1.732L6.657 2.94C5.907 2.513 5 3.016 5 3.868z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Skeleton className="h-2 w-72 rounded-full " />
            <Skeleton className="h-2 w-48 rounded-full" />
            <Skeleton className="h-2 w-28 bg-[#7254af] rounded-full mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContentArea;
