import React from "react";
import { Skeleton } from "../ui/skeleton";

const RightContentAreaCommunity = ({ data }) => {
  return (
    <div className="flex-1  border   my-5 flex flex-col shadow-md">
      <div className=" bg-gray-100  px-5 py-4 ">
        <div className="flex gap-5 ">
          <Skeleton className="h-3 w-3 rounded-full bg-gray-400" />
          <Skeleton className="h-3 w-3 rounded-full bg-gray-400" />
          <Skeleton className="h-3 w-3 rounded-full bg-gray-400" />
        </div>
      </div>

      <div className="flex">
        <div className=" flex  flex-col">
          <div className="bg-[#edbe70] h-48 text-center"></div>
          <div className="p-3">
            <h2 className="text-xl mt-4 font-semibold">
              {data.courseName || "Community Title"}
            </h2>
            <p className="mt-2">
              {data.courseDescription ||
                "Short description about your community"}
            </p>
          </div>
        </div>

        <div className="pb-10">
          <div className="flex flex-col px-10 mb-2 mt-7">
            <div className="flex  gap-6 mb-6">
              <Skeleton className="h-3 w-28   rounded-full " />
              <Skeleton className="h-3 w-28  rounded-full" />
              <Skeleton className="h-3 w-28  rounded-full" />
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-4 w-4  rounded-full " />
              <Skeleton className="h-3 w-28  rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 px-10">
            <div className="flex flex-col gap-5">
              <Skeleton className="h-48 w-full" />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-3 w-full  rounded-full " />
                  <Skeleton className="h-3 w-32  rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4  rounded-full " />
                  <Skeleton className="h-3 w-28  rounded-full" />
                </div>
              </div>
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContentAreaCommunity;
