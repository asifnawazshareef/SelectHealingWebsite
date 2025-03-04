import React from "react";
import { Skeleton } from "../ui/skeleton";

const RightContentArea = ({ data , title, description, }) => {
  return (
    <div className="flex-1  border rounded-xl   my-5 flex flex-col shadow-md">
      <div className=" bg-gray-100 rounded-t-xl p-5 mb-6">
        <div className="flex gap-5 ">
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
          <Skeleton className="h-4 w-4 rounded-full bg-gray-400" />
        </div>
      </div>

      <div className="flex px-10 mb-2">
        <Skeleton className="h-3 w-24 rounded-full" />
        <div className="flex ml-auto  lg:ml-8 2xl:ml-auto sm:ml-10 gap-6 mb-6">
          <Skeleton className="h-2 w-16 sm:w-12 rounded-full " />
          <Skeleton className="h-2 w-16 sm:w-12 rounded-full" />
          <Skeleton className="h-2 w-16 sm:w-12 rounded-full" />
          <Skeleton className="h-2 w-16 sm:w-12 rounded-full" />
        </div>
      </div>

      <div className="bg-blue-500 flex justify-center items-center text-white p-6 sm:p-4">
        <div className="text-center">
          <h2 className="text-xl mt-4 font-semibold">
            {title || "Course title"}
          </h2>
          <p className="mt-2">
            {description ||
              "Short description that tells what the course is about."}
          </p>
          <button className="m-4 px-10 py-4 bg-white text-blue-500 rounded-md font-medium">
            {data.buttonColor}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 m-6 mx-20">
        <div className="flex flex-col gap-4  items-center">
          <Skeleton className="h-32 w-full sm:w-48" />
          <Skeleton className="h-32 w-full sm:w-48" />
          <Skeleton className="h-32 w-full sm:w-48" />
        </div>
        <div className="flex lg:ml-8 2xl:ml-0 sm:ml-10  flex-col gap-6 ">
          <Skeleton className="h-6 w-2/3 sm:w-full rounded-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex flex-col gap-6 my-4">
            <Skeleton className="h-6 w-2/3 sm:w-full rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col gap-6">
            <Skeleton className="h-6 w-2/3 sm:w-full rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default RightContentArea;
