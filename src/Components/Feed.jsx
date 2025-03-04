import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import utils from "../utils/utils";
import { RiCloseLine } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const RichTextBox = ({ value }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>;
};

const Feed = () => {
  const [feedData, setFeedData] = useState();

  const fetchFeed = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}feeds?filters[community][id]=3&populate=*&filters[status][$eqi]=Published&pagination[limit]=1500&sort=createdAt:desc`,
        {
          headers: { Authorization: `Bearer ${utils.token}` },
        }
      );
      const feedData = response?.data?.data;
      setFeedData(feedData);
    } catch (error) {
      console.error("Error fetching feed data", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // Delete a feed item
  const handleDeleteFeed = async (id) => {
    try {
      await axios.delete(`${utils.BASE_URL}feeds/${id}`, {
        headers: { Authorization: `Bearer ${utils.token}` },
      });
      console.log("Feed deleted successfully");
      // Remove the deleted feed from the state
      setFeedData((prevFeedData) =>
        prevFeedData.filter((feed) => feed.id !== id)
      );
    } catch (error) {
      console.error("Error deleting feed:", error);
    }
  };

  // Confirmation modal for deletion
  const confirmDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this feed?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => {
                  handleDeleteFeed(id);
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        );
      },
      overlayClassName:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
    });
  };

  const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const secondsAgo = Math.floor((now - postDate) / 1000);

    const minutes = Math.floor(secondsAgo / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `Just now`;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 bg-[#F7F7F7]">
        {feedData?.map((item) => (
          <div
            key={item.id}
            className="bg-[#FFFFFF] p-4 mb-2 rounded-lg relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => confirmDelete(item.id)}
            >
              <RiCloseLine size={20} />
            </button>
            {/* Feed Header */}
            <div className="flex flex-col lg:flex-row justify-start items-center mb-[18px]">
              {item?.attributes?.postedBy?.data?.attributes?.picture == null ? (
                <div className="flex mr-[14px] justify-center cursor-pointer items-center w-[55.33px] h-[55.33px] bg-[#E0B15E] rounded-[50%]">
                  {/* Default profile icon (optional) */}
                </div>
              ) : (
                <div className="flex mr-[14px] justify-center cursor-pointer items-center w-[55.33px] h-[55.33px]">
                  <img
                    src={`https://admin.selecthealing.online${item?.attributes?.postedBy?.data?.attributes?.picture}`}
                    className="w-full h-full rounded-full object-cover"
                    alt=""
                  />
                </div>
              )}
              <div>
                <p className="font-[500] text-center lg:text-left mb-1 text-[#141619]">
                  {item?.attributes?.postedBy?.data
                    ? `${item?.attributes?.postedBy?.data?.attributes?.fname} ${item?.attributes?.postedBy?.data?.attributes?.lname}`
                    : "Anonymous"}
                </p>
                <p className="text-[#687884] font-normal text-sm leading-[21px] tracking-[-0.15px]">
                  {item?.attributes?.community?.data?.attributes?.eventTag} ·{" "}
                  {timeAgo(item?.attributes?.publishedAt)}
                </p>
              </div>
            </div>

            {/* Feed Content */}
            <div className="mb-3 text-center lg:text-left text-black font-normal text-[16px] leading-6 tracking-[-0.3px]">
              <RichTextBox value={item?.attributes?.title} />
            </div>

            {/* Feed Image */}
            {item?.attributes?.attachment?.data && (
              <div className="feedImg mb-3">
                <img
                  src={`https://admin.selecthealing.online${item?.attributes?.attachment?.data?.attributes?.url}`}
                  alt=""
                  className="min-w-[350px] min-h-[350px] max-w-[350px] max-h-[350px] object-cover"
                />
              </div>
            )}

            {/* Feed Actions */}
            <div className="icons flex gap-10 items-center text-[#687884]">
              <div className="comments flex gap-1 items-center cursor-pointer">
                <span className="text-xs">
                  {item?.attributes?.comments?.data?.length || 0}
                </span>
              </div>
              <div className="likes flex gap-1 items-center cursor-pointer">
                <span className="text-xs leading-4">
                  {item?.attributes?.likes?.data?.length || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
