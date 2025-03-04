import React from "react";
import { LuDownload } from "react-icons/lu";
import { Skeleton } from "../ui/skeleton";

const RightDownloadArea = ({ data }) => {
  return (
    <div className="flex-1 border rounded-xl mx-10   my-10 flex flex-col shadow-md">
      <div className="bg-gray-100 rounded-t-xl p-5 mb-6">
        <div className="flex gap-5">
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
        </div>
      </div>

      <div className="flex px-10 justify-between mb-2">
        <Skeleton className=" h-3 w-8 md:w-24 rounded-full" />
        <div className="flex  gap-6 mb-6">
          <Skeleton className="h-2 w-20 rounded-full " />
          <Skeleton className="h-2 w-20 rounded-full" />
          <Skeleton className="h-2 w-20 rounded-full" />
          <Skeleton className="h-2 w-20 rounded-full" />
        </div>
      </div>

      <div className="bg-blue-500 flex justify-center items-center text-white p-6"></div>

      <div className="px-6 2xl:px-36"> 
  <div className="flex m-10 gap-6 flex-wrap lg:flex-nowrap"> 
    
    <Skeleton className="h-40 w-full sm:w-72 md:w-96 rounded-lg" /> 
          <div className="border flex flex-col items-center justify-center text-center h-28 w-60 rounded-xl">
            <div className="justify-center">
              <LuDownload className="text-blue-500 size-10 " />
            </div>
            <Skeleton className="h-6 w-40 mt-3 rounded-full bg-blue-500 " />
          </div>
        </div>

        {/* Add padding to align with the left skeleton section */}
        <div className=" px-10 mb-60">
          <h2 className="text-xl mt-4 font-semibold">
            {data.downloadName || "Download Title"}
          </h2>
          <p className="mt-2">
            {data.downloadDescription ||
              "Short description that tells what the download is about."}
          </p>
       
        </div>
      </div>
    </div>
  );
};

export default RightDownloadArea;
