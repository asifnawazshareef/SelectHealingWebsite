import { Button } from "../ui/button";
import { FaRegComment } from "react-icons/fa";
import { Input } from "@/ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader } from "@/ui/card";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import utils from "../utils/utils";
import { toast } from "react-toastify";
import { HiDotsHorizontal, HiDotsVertical, HiX } from "react-icons/hi";
import { ChevronDown, Circle, Trash2, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Newsletters = () => {
  const [newsletterListings, setNewsletterListings] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [newsletterId, setNewsletterId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [previewThumbnailImage, setPreviewThumbnailImage] = useState("");
  const [author, setAuthor] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
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
  // Fetch authors list from API or predefined list
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${utils.BASE_URL}authors`, {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        });
        if (response.status === 200) {
          setAuthorsList(response?.data?.data);
          console.log(response?.data?.data, "auther response");
        } else {
          toast.error("Failed to fetch authors.");
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
        toast.error("Error fetching authors. Please try again.");
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchNewsLetterListings();
  }, []);
  const fetchNewsLetterListings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${utils.BASE_URL}news?populate=*`, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });
      const newsletterList = response?.data?.data?.map((news) => {
        return {
          id: news?.id,
          title: news?.attributes?.title,
          media: news?.attributes?.media?.data?.attributes?.url,
          description: news?.attributes?.description,
          author: news?.attributes?.author,
          url: news?.attributes?.url,
          createdAt: new Date(news?.attributes?.createdAt).toLocaleDateString(),
          updatedAt: new Date(news?.attributes?.updatedAt).toLocaleDateString(),
          publishedAt: new Date(
            news?.attributes?.publishedAt
          ).toLocaleDateString(),
        };
      });
      console.log(response.data);
      setNewsletterListings(newsletterList);
    } catch (error) {
      toast.error("failed to fetch newsletters");
    } finally {
      setLoading(false);
    }
  };

  // Remove lesson API
  const deleteNewsletter = async (id) => {
    const url = `${utils.BASE_URL}news/${id}`;
    console.log("Sending DELETE request to:", url);

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });

      if (response.status === 200) {
        console.log("Newsletter deleted successfully:", response.data);

        toast.success("The newsletter has been deleted successfully.");
        fetchNewsLetterListings();
      }
    } catch (error) {
      console.error("Error deleting newsletter:", error.message);
      toast.error("Error deleting newsletter:");
    }
  };
  // Update Newsletter API
  const handleThumbnailImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailImage(file);
      setPreviewThumbnailImage(URL.createObjectURL(file));
    }
  };
  const handleEditModule = async () => {
    if (!newsletterId || !title || !description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const toastId = toast.loading("Updating newsletter...");
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          description: description,
          author: author,
          url: url,
        })
      );

      if (thumbnailImage) {
        formData.append("files.media", thumbnailImage);
      }

      const response = await axios.put(
        `${utils.BASE_URL}news/${newsletterId}`,
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
          render: "Newsletter updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        fetchNewsLetterListings();
        setIsEditDialogOpen(false);
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.log("Error updating newsletter:", error.message);
      toast.error("Failed to update the newsletter. Please try again.");
    }
  };

  return (
    <div className="px-5 min-h-screen min-w-full">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold">
            Newsletters
          </h1>
          <Link to="/add-newsletter">
            <Button className="bg-black text-white py-3 px-3 md:py-5 md:px-5 text-xs sm:text-sm md:text-base rounded-full">
              <FaPlus />
              New newsletter
            </Button>
          </Link>
        </div>
        <p className="text-sm">Manage your newsletters or create a new one</p>
      </div>
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="spinner-border animate-spin border-t-4 border-blue-600 border-solid w-16 h-16 rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 mt-6">
          {newsletterListings?.map((card, index) => (
            <Card key={index} className="w-full pb-5 shadow-md border-none">
              <CardHeader>
                <div className="flex justify-center h-72 overflow-hidden md:h-80 items-center w-full bg-gray-100 rounded-md">
                  <img
                    className="h-[320px] object-cover"
                    src={`${utils.BASE_URL_MEDIA}${card.media}`}
                    alt="Newsletter Thumbnail"
                  />
                </div>
              </CardHeader>
              <CardContent className="py-5 md:py-10">
                <Link
                  to={card.url}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(card.url, "_blank", "noopener,noreferrer");
                  }}
                >
                  <h3 className="mb-2 text-sm md:text-lg font-semibold">
                    {card.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm md:text-lg">
                  {card.description}
                </p>
              </CardContent>
              <div className="relative">
                <DropdownMenu className="relative">
                  <DropdownMenuTrigger className="text-gray-500 hover:text-black">
                    <HiDotsHorizontal className="cursor-pointer absolute left-5" />
                  </DropdownMenuTrigger>
                  <div className="w-full absolute right-0">
                    <DropdownMenuContent className="bg-white border  border-gray-300  rounded-md shadow-lg w-40 mt-2">
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditDialogOpen(true);
                          setNewsletterId(card.id);
                          setDescription(card.description);
                          setTitle(card.title);
                          setAuthor(card.author);
                          setUrl(card.url);
                          setThumbnailImage(
                            `${utils.BASE_URL_MEDIA}${card.media}`
                          );
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          confirmAndDelete(
                            "Are you sure you want to delete this newsletter?",
                            () => deleteNewsletter(card.id)
                          );
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>

                {isEditDialogOpen && (
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogContent className="mx-4 max-h-screen overflow-y-auto sm:max-w-xl sm:mx-auto my-auto p-6 rounded-md shadow-lg bg-white">
                      <DialogHeader>
                        <DialogTitle>
                          <div className="mb-5 leading-6 text-xl">
                            Edit Newsletter
                          </div>
                        </DialogTitle>
                        <DialogDescription>
                          <div>
                            <div className="mt-2 mb-4">
                              <label className="text-medium mb-2 font-semibold text-black">
                                Title
                              </label>
                              <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title here"
                              />
                            </div>

                            <div className="mt-2 mb-4">
                              <label className="text-medium mb-2 font-semibold text-black">
                                Author
                              </label>
                              <Select
                                onValueChange={(value) => setAuthor(value)}
                                defaultValue=""
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder="Select an author"
                                    value={author}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {authorsList?.map((authorItem) => (
                                    <SelectItem
                                      key={authorItem.id}
                                      value={authorItem?.attributes?.name}
                                    >
                                      {authorItem?.attributes?.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="mt-2 mb-4">
                              <label className="text-medium mb-2 font-semibold text-black">
                                URL slug
                              </label>
                              <Input
                                id="current"
                                placeholder="url"
                                value={url}
                                onChange={(e) => {
                                  setUrl(e.target.value);
                                }}
                                type="settings"
                              />
                            </div>
                            <div className="mt-2 mb-4">
                              <label className="text-medium mb-2 font-semibold text-black">
                                Description
                              </label>
                              <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type your description here."
                                rows="6"
                              />
                            </div>
                            <section className="mb-6">
                              <label className="text-medium mb-2 font-semibold text-black">
                                Thumbnail
                              </label>
                              <div className="border rounded-lg p-6 flex lg:flex-row flex-col items-center gap-10">
                                {thumbnailImage || previewThumbnailImage ? (
                                  <img
                                    src={
                                      previewThumbnailImage || thumbnailImage
                                    }
                                    alt="Selected Thumbnail"
                                    className="w-32 h-32 object-cover rounded"
                                  />
                                ) : (
                                  <div className="w-[35%] h-36 bg-gray-200 rounded-md flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-16 w-16 text-[#bbbab9]"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                      ></rect>
                                      <circle
                                        cx="8.5"
                                        cy="8.5"
                                        r="1.5"
                                      ></circle>
                                      <path d="M21 15l-5-5L5 21"></path>
                                    </svg>
                                  </div>
                                )}
                                <div className="flex flex-col gap-10 items-center">
                                  <label className="bg-white rounded-full hover:bg-gray-100 font-medium text-gray-700 py-2 px-6 shadow-md border-gray-200 border-[1px] cursor-pointer">
                                    <h2 className="flex items-center justify-center gap-3">
                                      <span> Choose thumbnail</span>
                                      <ChevronDown className="size-7" />
                                    </h2>
                                    <Input
                                      id="thumbnail"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleThumbnailImage}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                              </div>
                            </section>

                            <div className="flex justify-end gap-4 mt-5">
                              <Button
                                variant="outline"
                                className="rounded-full py-5"
                                onClick={() => setIsEditDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="rounded-full py-5"
                                onClick={handleEditModule}
                              >
                                Update Newsletter
                              </Button>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Newsletters;
