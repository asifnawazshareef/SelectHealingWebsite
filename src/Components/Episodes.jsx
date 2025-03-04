import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiVideoOn } from "react-icons/ci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import utils from "../utils/utils";
import { GrSchedule } from "react-icons/gr";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const Episodes = ({ id }) => {
  const [episodes, setEpisodes] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [editingEpisodeId, setEditingEpisodeId] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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
  const openVideoModal = (url) => {
    setSelectedVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideoUrl("");
    setIsVideoModalOpen(false);
  };
  // publish and draft API
  const handlePublishStatusChange = async (statusId, isPublished) => {
    const url = `${utils.BASE_URL}episodes/${statusId}`;

    const data = {
      publishedAt: isPublished ? new Date().toISOString() : null,
    };

    try {
      const response = await axios.put(
        url,
        { data },
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      setEpisodes((prevEpisodes) =>
        prevEpisodes.map((episode) =>
          episode.id === editingEpisodeId
            ? { ...episode, publishedAt: isPublished ? data.publishedAt : null }
            : episode
        )
      );

      console.log("Publish status updated:", response.data);
      toast.success("Status updated successfully..");
    } catch (error) {
      console.error("Error updating publish status:", error);
      toast.error("Error updating publish status");
    }
  };
  // Fetch Episode API
  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}episodes?populate=*&filters[podcast][id]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      console.log(response.data.data);
      setEpisodes(response.data.data);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      toast.error("Failed to fetch episodes.");
    }
  };

  const handleDelete = async (episodeId) => {
    const url = `${utils.BASE_URL}episodes/${episodeId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });

      if (response.status === 200) {
        toast.success("The episode has been deleted.");
        fetchEpisodes();
      } else {
        throw new Error("Unexpected response status.");
      }
    } catch (error) {
      console.error("Error deleting episode:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEpisode = async () => {
    if (!editingEpisodeId) return;

    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          description: description,
          podcast: id,
        })
      );

      if (selectedFile) {
        formData.append("files.media", selectedFile);
      }
      if (selectedFile) {
        formData.append("files.media", selectedFile);
      }

      const response = await axios.put(
        `${utils.BASE_URL}episodes/${editingEpisodeId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("The episode has been updated.");
        setIsEditDialogOpen(false);
        fetchEpisodes();
      }
    } catch (error) {
      console.error("Error updating episode:", error);
      toast.error("Failed to update the episode.");
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Uploaded video:", file);
    }
  };
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailImage(file);
      console.log("Uploaded thumnail:", file);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [id]);

  return (
    <>
      {episodes.length > 0 ? (
        <>
          <div className="border-b px-5 py-10">
            {/* Search Input */}
            <div className="flex items-center border border-gray-300 px-2 rounded-lg bg-white">
              <FaSearch className="text-gray-500 mr-1" />
              <Input
                type="text"
                placeholder="Find..."
                className="border-none outline-none focus:outline-none focus:ring-0 flex-1"
              />
            </div>

            {/* Navigation and Sort */}
            <div className="flex items-center justify-between mt-4">
              {/* Left Side: Span Text */}
              <span className="text-gray-700 font-normal">
                Displaying{" "}
                <span className="font-semibold">{episodes.length}</span>{" "}
                Episodes
              </span>

              {/* Right Side: Navigation Icons and Sort Dropdown */}
              <div className="flex items-center gap-8">
                {/* Navigation Icons */}
                <div className="flex items-center gap-8">
                  <IoIosArrowBack size={24} className="text-gray-500" />
                  <IoIosArrowForward size={24} className="text-gray-500" />
                </div>

                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort : Newest <RiArrowDropDownLine />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Newest</DropdownMenuItem>
                    <DropdownMenuItem>Oldest</DropdownMenuItem>
                    <DropdownMenuItem>Date</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="border-b px-2 py-10">
            <div className="min-w-full text-center text-gray-500">
              <div className="flex border-b mb-1 justify-between">
                <div className="w-[35%] px-4 py-2 font-semibold text-left">
                  Episode Title
                </div>
                <div className="w-[25%] px-4 py-2 font-semibold text-left">
                  Status
                </div>
                <div className="w-[25%] px-4 py-2 font-semibold text-left">
                  Published Date
                </div>
                {/* <div className="w-[20%] px-4 py-2 font-semibold text-left">
                  Length
                </div> */}
                <div className="w-[25%] px-4 py-2 font-semibold text-right">
                  Actions
                </div>
              </div>

              <Accordion
                type="single"
                className="flex flex-col gap-3"
                collapsible
              >
                {episodes?.map((episode) => (
                  <AccordionItem key={episode.id} value={`item-${episode.id}`}>
                    <AccordionTrigger className="p-4 relative border border-b-0 text-lg flex items-center gap-2 rounded-t-lg">
                      {/* <div key={episode.id} className=" "> */}
                      <div className="w-[28%] py-2  gap-3 flex items-center flex-col text-left xl:flex-row ">
                        <div className="w-14 h-14">
                          <img
                            src={`${utils.BASE_URL_MEDIA}${episode?.attributes?.thumbnail?.data?.attributes?.url}`}
                            alt=""
                            className="rounded-lg w-full h-full object-cover"
                          />
                        </div>
                        <span className="">{episode?.attributes?.title}</span>
                      </div>
                      <span className="w-[20%] py-2 text-left text-gray-700">
                        <div className="bg-green-200 text-green-800 w-fit rounded-full">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <div className="flex items-center gap-2 text-sm px-3 py-1 hover: border-none  ">
                                <FaCheck />
                                {episode?.attributes?.publishedAt
                                  ? "Published"
                                  : "Unpublished"}
                                <RiArrowDropDownLine className="text-3xl" />
                              </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Status</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  handlePublishStatusChange(episode.id, true)
                                }
                              >
                                Published
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handlePublishStatusChange(episode.id, false)
                                }
                              >
                                Unpublished
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </span>
                      <div className="w-[32%] py-2 text-left">
                        {episode?.attributes?.publishedAt
                          ? new Date(
                              episode?.attributes?.publishedAt
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "-"}
                      </div>

                      {/* <div className="w-[20%]  py-2 text-left">
                        {episode.attributes.length || "00:00"}
                      </div> */}

                      <DropdownMenu className="w-[25%] text-left">
                        <DropdownMenuTrigger className="text-gray-500 hover:text-black ">
                          <HiDotsHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border border-gray-300 rounded-md shadow-lg w-40">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingEpisodeId(episode.id);
                              setTitle(episode.attributes.title || "");
                              setDescription(
                                episode.attributes.description || ""
                              );
                              setIsEditDialogOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              confirmAndDelete(
                                "Are you sure you want to delete this episode?",
                                () => handleDelete(episode.id)
                              )
                            }
                            className="text-red-500"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {isEditDialogOpen && (
                        <Dialog
                          open={isEditDialogOpen}
                          onOpenChange={setIsEditDialogOpen}
                        >
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Episode</DialogTitle>
                            </DialogHeader>
                            <div>
                              {/* Form for editing an episode */}
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault(); // Prevent default form submission
                                  handleUpdateEpisode();
                                }}
                              >
                                {/* Episode Title */}
                                <div className="mb-4">
                                  <label
                                    className="block text-base font-medium text-gray-700"
                                    htmlFor="podcastName"
                                  >
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    id="episodeTitle"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-1.5 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none "
                                    placeholder="Episode title"
                                  />
                                </div>

                                {/* Episode Type */}
                                <div className="mb-4">
                                  <h2 className="block text-base font-medium text-gray-700">
                                    Type
                                  </h2>
                                  <div>
                                    <Select
                                      defaultValue="episode"
                                      className="py-2"
                                      onValueChange={(value) => {
                                        // Add functionality if required to store 'type'
                                        console.log("Selected type:", value);
                                      }}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Episode" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="episode">
                                          Episode
                                        </SelectItem>
                                        <SelectItem value="bonus">
                                          Bonus
                                        </SelectItem>
                                        <SelectItem value="trailer">
                                          Trailer
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                {/* Show Notes */}
                                <div className="mb-4">
                                  <h2 className="block text-base font-medium text-gray-700">
                                    Show notes
                                  </h2>
                                  <textarea
                                    id="episode-description"
                                    rows={6}
                                    value={description}
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    className="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none "
                                    placeholder="Give your audience a detailed description of your episode. This will appear on your Podcast page and on listening apps."
                                  ></textarea>
                                </div>

                                <label
                                  htmlFor="image-upload"
                                  className="mb-4 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center cursor-pointer"
                                >
                                  <p>Upload Thumbnail</p>
                                  <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleThumbnail}
                                  />
                                  {thumbnailImage && (
                                    <div className="mt-4 text-sm text-gray-700">
                                      <strong>Selected file:</strong>{" "}
                                      {thumbnailImage.name}
                                    </div>
                                  )}
                                </label>
                                {/* Video Upload */}
                                <div className="mb-4">
                                  <label
                                    className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center flex flex-col items-center justify-center cursor-pointer"
                                    htmlFor="videoUpload"
                                  >
                                    <p className="text-sm text-gray-500">
                                      The maximum size for the media upload is{" "}
                                      <span className="text-gray-700 font-semibold">
                                        1 GB
                                      </span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Supported file formats: mp4, mov, avi
                                    </p>
                                    <p className="mt-2 text-sm text-gray-800 font-semibold">
                                      Upload Video
                                    </p>
                                    <input
                                      type="file"
                                      id="videoUpload"
                                      className="hidden"
                                      onChange={handleVideoUpload}
                                    />
                                  </label>
                                  {selectedFile && (
                                    <div className="mt-4 text-sm text-gray-700">
                                      <strong>Selected file:</strong>{" "}
                                      {selectedFile.name}
                                    </div>
                                  )}
                                </div>
                              </form>
                            </div>

                            {/* Footer Buttons */}
                            <DialogFooter>
                              <Button
                                variant="primary"
                                className="rounded-full text-xs border"
                                onClick={() => setIsEditDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="submit"
                                className="rounded-full text-xs"
                                onClick={handleUpdateEpisode}
                              >
                                Update Episode
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </AccordionTrigger>

                    {/* publish and unpublish code */}
                    <AccordionContent className=" p-6 border border-b-0 text-base rounded-b-lg flex items-center gap-2  ">
                      <CiVideoOn />
                      {episode?.attributes?.media?.data?.attributes?.url ? (
                        <button
                          onClick={() =>
                            openVideoModal(
                              episode?.attributes?.media?.data?.attributes?.url
                            )
                          }
                          className="text-blue-500 underline hover:text-blue-700"
                        >
                          Watch Video
                        </button>
                      ) : (
                        <span className="text-gray-500 italic">
                          No video available
                        </span>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {/* Simple Modal */}
            {isVideoModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl">
                  <div className="p-4 border-b border-gray-300">
                    <h2 className="text-xl font-semibold">Video Workshop</h2>
                  </div>
                  <div className="p-4">
                    <video
                      controls
                      width="100%"
                      height="400px"
                      className="rounded-lg"
                    >
                      <source
                        src={`${utils.BASE_URL_MEDIA}${selectedVideoUrl}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4 border-t border-gray-300 flex justify-end">
                    <button
                      onClick={closeVideoModal}
                      className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <h2 className="py-10 text-base font-medium  text-center">
          No episode available!
        </h2>
      )}
    </>
  );
};

export default Episodes;
