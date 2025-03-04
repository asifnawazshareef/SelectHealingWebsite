import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import PodcastSettingsTab from "../Components/PodcastComponents/PodcastSettingsTab";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/ui/dialog";
import axios from "axios";
import utils from "../utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Episodes from "../Components/Episodes";
const PodcastDetails = () => {
  const [activeTab, setActiveTab] = useState("Outline");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const tabs = [{ name: "Outline" }, { name: "Settings" }];
  const [uploadProgress, setUploadProgress] = useState(0);
  // get podcast by ID API
  useEffect(() => {
    fetchPodcastDetails();
  }, []);
  const fetchPodcastDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${utils.BASE_URL}podcasts/${id}?populate[media]=true`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      console.log(response.data.data);
      setTitle(response?.data?.data?.attributes?.title);
      setDescription(response?.data?.data?.attributes?.description);
      setAuthor(response?.data?.data?.attributes?.author);
      setCaption(response?.data?.data?.attributes?.caption);
      setThumbnailImage(
        response?.data?.data?.attributes?.media?.data?.attributes?.url
      );
      setError(null);
    } catch (error) {
      setError("Failed to fetch podcast details.");
    } finally {
      setLoading(false);
    }
  };
  // edit podcast API
  const handleEditCourse = async () => {
    if (!courseId || !title || !description) {
      toast.error("All fields are required.");
      return;
    }
    try {
      const toastId = toast.loading("Updating podcast...");

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          description: description,
          author: author,
        })
      );
      if (thumbnailImage) {
        formData.append("files.media", thumbnailImage);
        formData.append("files.thumbnail", thumbnailImage);
        formData.append("files.video", thumbnailImage);
      }
      const response = await axios.put(
        `${utils.BASE_URL}podcasts/${id}?populate[media]=true`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.update(toastId, {
          render: "Thumbnail updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        navigate("/podcastsListing");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.log("Error updating podcast:", error.message);
      toast.error("Failed to update the podcast. Please try again.");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    if (thumbnailImage) {
      formData.append("files.thumbnail", thumbnailImage);
    }
    try {
      const response = await axios.post(
        "http://54.173.110.62:1337/api/episodes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${utils.token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Episode added successfully!");
        setIsDialogOpen(false);
        setTitle("");
        setDescription("");
        setSelectedFile(null);
        setThumbnailImage(null);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
      console.log("Upload successful:", response.data);
      setUploadProgress(0);
    } catch (error) {
      console.error(
        "Error adding episode:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error?.message ||
          "Error adding episode. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDialogOpenChange = (open) => {
    if (!open) {
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setThumbnailImage(null);
    }
    setIsDialogOpen(open);
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="spinner-border animate-spin border-t-4 border-blue-600 border-solid w-16 h-16 rounded-full"></div>
        </div>
      ) : (
        <div className="p-2 w-full">
          <section className="flex flex-col w-full">
            <div className="flex gap-5 w-full">
              <div className="flex flex-col  justify-between w-full">
                <div className="w-full flex items-center justify-between">
                  <h1 className="text-xs md:text-sm lg:text-base xl:text-lg font-semibold">
                    {title}
                  </h1>

                  <Dialog
                    open={isDialogOpen}
                    onOpenChange={handleDialogOpenChange}
                  >
                    <DialogTrigger asChild>
                      <Button className="flex rounded-full py-3 px-6">
                        New episode
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-labelledby="dialog-title"
                      aria-describedby="dialog-description"
                    >
                      <DialogHeader>
                        <DialogTitle>New Episode</DialogTitle>
                      </DialogHeader>
                      <div>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label
                              className="block text-base font-medium text-gray-700"
                              htmlFor="dialog-title"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              id="dialog-title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="w-full px-4 py-1.5 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                              placeholder="Episode title"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <h2 className="block text-base font-medium text-gray-700">
                              Type
                            </h2>
                            <div>
                              <Select defaultValue="episode" className="py-2">
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Episode" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="episode">
                                    Episode
                                  </SelectItem>
                                  <SelectItem value="bonus">Bonus</SelectItem>
                                  <SelectItem value="trailer">
                                    Trailer
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h2 className="block text-base font-medium text-gray-700">
                              Show notes
                            </h2>
                            <textarea
                              id="dialog-description"
                              rows={5}
                              value={description}
                              required
                              onChange={(e) => setDescription(e.target.value)}
                              className="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm border text-gray-700 placeholder-gray-400 focus:outline-none "
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
                          <div className="mb-4">
                            <label
                              className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center cursor-pointer"
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
                          {/* Progress bar */}
                          {uploadProgress > 0 && (
                            <div className="mt-4">
                              <div className="bg-gray-300 h-2 mb-2">
                                <div
                                  className="bg-blue-600 h-2"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                              <p>{uploadProgress}% Uploading...</p>
                            </div>
                          )}

                          {error && (
                            <p className="text-red-500 mt-2">{error}</p>
                          )}
                          <DialogFooter>
                            <Button
                              disabled={loading}
                              variant="primary"
                              className="rounded-full text-xs border"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              disabled={loading}
                              className="rounded-full text-xs"
                            >
                              {loading ? "Adding..." : "Add episode"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <nav className="hidden lg:flex  gap-3 mt-5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      className={cn(
                        "pb-3 text-sm font-medium transition-all flex items-center gap-1",
                        activeTab === tab.name
                          ? "text-red-500 border-b-2 border-red-500"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                      onClick={() => setActiveTab(tab.name)}
                    >
                      {tab.name}
                      {tab.version !== undefined && (
                        <span className="bg-blue-700 text-white px-2 py-1 rounded-full">
                          {tab.version}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="lg:hidden  flex items-center justify-center">
              <nav className="flex  gap-3 mt-5">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={cn(
                      "pb-3 text-sm font-medium transition-all flex items-center gap-1",
                      activeTab === tab.name
                        ? "text-red-500 border-b-2 border-red-500"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                    {tab.version !== undefined && (
                      <span className="bg-blue-700 text-white px-2 py-1 rounded-full">
                        {tab.version}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </section>

          {/* Tab Content */}
          <Card className="mt-6 rounded-lg shadow-none border-none">
            {activeTab === "Outline" && <Episodes id={id} />}

            {activeTab === "Settings" && (
              <div>
                <PodcastSettingsTab
                  podcastTitle={title}
                  podcastDescription={description}
                  podcastAuthor={author}
                  id={id}
                  podcastThumbnail={thumbnailImage}
                />
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default PodcastDetails;
