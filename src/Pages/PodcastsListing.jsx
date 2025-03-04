import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaPlus } from "react-icons/fa6";
import { MdSignalCellularAlt } from "react-icons/md";
import { TbAlignBoxLeftTop } from "react-icons/tb";
import axios from "axios";
import utils from "../utils/utils";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const PodcastsListing = () => {
  const [podcastListings, setPodcastListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [podcastId, setPodcastId] = useState(null);
  // Confirm and Delete Alert
  const confirmAndDelete = (message, deleteHandler) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
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
                  deleteHandler();
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
  // end Confirm and Delete Alert
  const navigate = useNavigate();
  const placeholderImage =
    "https://via.placeholder.com/128x80?text=Placeholder";

  const fetchPodcastListings = async () => {
    try {
      const response = await axios.get(`${utils.BASE_URL}podcasts?populate=*`, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });

      const podcastList = response.data?.data?.map((item) => {
        const attributes = item.attributes || {};
        const authorPicture =
          attributes.authorPicture?.data?.attributes?.url || null;
        const videoUrl = attributes.video?.data?.attributes?.url || null;
        const categoryName =
          attributes.category?.data?.attributes?.name || "No Category";

        return {
          id: item.id,
          title: attributes.title || "No Title",
          caption: attributes.caption || "No Caption",
          thumbnail: attributes.media?.data?.attributes?.url || null,
          description: attributes.description || "No Description",
          createdAt: new Date(attributes.createdAt).toLocaleDateString(),
          products: attributes.products?.length || 0,
          author: attributes.author || "Unknown Author",
          authorPicture,
          videoUrl,
          category: categoryName,
        };
      });

      console.log(podcastList, "podcastList");

      setPodcastListings(podcastList);
      setError(null);
    } catch (error) {
      toast.error("failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcastListings();
  }, []);

  const deletePodcast = async (podcastId) => {
    const url = `${utils.BASE_URL}podcasts/${podcastId}`;
    console.log("Sending DELETE request to:", url);
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });
      if (response.status === 200) {
        console.log("Podcast deleted successfully:", response.data);
        toast.success("Podcast deleted successfully!");
        setPodcastListings((prev) =>
          prev.filter((podcast) => podcast.id !== podcastId)
        );
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const podcasts = [
    {
      id: 1,
      title: "Title",
      episodes: 5,
      downloads: 2,
      createdAt: "May 22, 2024",
    },
  ];

  return (
    <div className="min-w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="spinner-border animate-spin border-t-4 border-blue-600 border-solid w-16 h-16 rounded-full"></div>
        </div>
      ) : (
        <div className="px-5 min-h-screen">
          {/* Conditional Rendering */}

          {podcastListings.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center px-5 min-h-screen">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#ff9970] shadow-lg">
                <Mic className="text-white w-10 h-10" />
              </div>
              <h1 className="mt-6 font-bold text-gray-800 text-lg sm:text-xl md:text-3xl text-center">
                Create your podcast
              </h1>
              <p className="mt-6 text-center text-gray-600 text-sm md:text-base max-w-lg">
                Create and publish episodes, distribute to all major listening
                apps, and monetize your podcast — all from your dashboard.
              </p>
              <Link to="/add-podcast">
                <Button className="mt-6 bg-black text-white text-sm md:text-base p-4 md:p-6 rounded-full outline-none transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Podcasts</h1>
                <Button
                  onClick={() => navigate("/add-podcast")}
                  className="bg-black text-white px-5 py-5 rounded-full"
                >
                  <FaPlus />
                  New podcast
                </Button>
              </div>

              {/* Podcasts List */}
              <div>
                {podcastListings.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="flex items-center gap-4 px-6 py-8 bg-white mb-2 rounded-2xl outline-none shadow-md"
                  >
                    <div className="flex-shrink-0 rounded-lg w-32 h-20 text-white text-center flex items-center justify-center">
                      {podcast.thumbnail ? (
                        <img
                          src={`https://admin.selecthealing.online${podcast.thumbnail}`}
                          alt=""
                          className="object-cover"
                        />
                      ) : (
                        <img
                          src={placeholderImage}
                          alt=""
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 items-center">
                      <Link
                        to={`/podcast-detail/${podcast.id}`}
                        className="cursor-pointer hover:text-blue-700"
                      >
                        <h3 className="text-medium font-semibold">
                          {podcast.title}
                        </h3>
                      </Link>

                      <div className="mt-3 flex gap-6 text-black">
                        <p className="flex gap-2 text-sm items-center">
                          <TbAlignBoxLeftTop /> {podcast.episodes || 0}
                        </p>
                        <p className="flex gap-2 text-sm items-center">
                          <MdSignalCellularAlt /> {podcast.downloads || 0}
                        </p>
                        <p className="flex gap-1 text-sm items-center">
                          <CiCalendar className="text-2xl" />
                          Created {podcast.createdAt}
                        </p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-gray-500 hover:text-black">
                        <HiDotsHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-300 rounded-md shadow-lg w-40">
                        <Link
                          to={`/podcast-detail/${podcast.id}`}
                          className="flex items-center gap-2 cursor-pointer hover:text-blue-700"
                        >
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => {
                            confirmAndDelete(
                              "Are you sure you want to delete this podcast?",
                              () => deletePodcast(podcast.id)
                            );
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PodcastsListing;
