import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { IoPricetagOutline } from "react-icons/io5";
import DownloadsSettingsTab from "../Components/DownloadsSettingsTab";
import img1 from "../assets/videoImg.png";
import placeholderImage from "../assets/userPlaceholderImg.png";
import { CiSearch, CiVideoOn, CiCircleQuestion } from "react-icons/ci";
import { Input } from "@/ui/input";
import { AiOutlineBars } from "react-icons/ai";
import { MdInfo } from "react-icons/md";
import { PiFolderLight } from "react-icons/pi";
import { FaCheck, FaUser } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import img2 from "../assets/ProductPageCardImg.svg";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import "react-toastify/dist/ReactToastify.css";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import utils from "../utils/utils";
import { Textarea } from "../ui/textarea";
import CourseSettingsTab from "../Components/CourseSettingsTab";
import { useNavigate } from "react-router";
import { FaMailBulk } from "react-icons/fa";
import { Delete, DeleteIcon, Mail } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const CourseDetails = () => {
  const location = useLocation();
  const { updatedPrice, isOfferUpdated } = location.state || {};
  const [lessonListings, setLessonListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lessonId, setLessonId] = useState(null);
  const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Outline");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseListings, setCourseListings] = useState(null); // Complete course data
  const [courseTitle, setCourseTitle] = useState("");
  // const [courseCaption, setCourseCaption] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseCreatedAt, setCourseCreatedAt] = useState("");
  const [courseBuys, setCourseBuys] = useState([]);
  const [courseDownloads, setCourseDownloads] = useState([]);
  const [courseMedia, setCourseMedia] = useState("");
  const [courseId, setCourseId] = useState(id);
  const [courseCategory, setCourseCategory] = useState("");
  const [offerId, setOfferId] = useState(id);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [offerData, setOfferData] = useState([]);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabs = [
    { name: "Outline" },
    { name: "Offers", count: offerData.length },
    { name: "Customers", count: courseBuys?.length },
    { name: "Settings" },
  ];
  const handleAddContentClick = () => {
    console.log("Modal opened");
    setIsDialogOpen(true);
  };
  // Get Lessons API;
  const fetchLessonListings = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}contents?populate=*&filters[course][id][$eq]=${id}&publicationState=preview`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        const lessons = response.data.data.map((lesson) => {
          const { attributes } = lesson;
          const courseData = attributes.course?.data
            ? {
                title: attributes.course.data.attributes.title,
                caption: attributes.course.data.attributes.caption,
                duration: attributes.course.data.attributes.duration,
                price: attributes.course.data.attributes.price,
                description: attributes.course.data.attributes.description,
              }
            : null;
          setCourse(courseData);
          const video = attributes.video?.data
            ? {
                url: attributes.video.data.attributes.url,
                mime: attributes.video.data.attributes.mime,
              }
            : null;
          const thumbnail = attributes.thumbnail?.data
            ? {
                url: `https://admin.selecthealing.online${attributes.thumbnail.data.attributes.url}`,
                alt:
                  attributes.thumbnail.data.attributes.alternativeText ||
                  "Lesson Thumbnail",
              }
            : null;
          const playlists = attributes.playlists?.data
            ? attributes.playlists.data.map(
                (playlist) => playlist.attributes.title
              )
            : [];
          const attachment = attributes.attachment?.data
            ? {
                name: attributes.attachment.data.attributes.name,
                url: attributes.attachment.data.attributes.url,
              }
            : null;
          return {
            id: lesson.id,
            title: attributes.title,
            description: attributes.description,
            createdAt: new Date(attributes.createdAt).toLocaleString(),
            updatedAt: new Date(attributes.updatedAt).toLocaleString(),
            course,
            video,
            thumbnail,
            playlists,
            attachment,
          };
        });
        setLessonListings(lessons);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setError("Failed to fetch lessons");
    }
  };
  useEffect(() => {
    fetchLessonListings();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }
  // Get Course by ID
  useEffect(() => {
    fetchCourseDetails();
    fetchOfferCourses();
  }, []);

  const fetchOfferCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${utils.BASE_URL}offers?populate[course][populate]=media&filters[course][id]=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const offerData = response.data?.data;
      setOfferData(offerData);

      setError(null);
    } catch (error) {
      setError("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${utils.BASE_URL}courses/${id}?populate[buys][populate]=user&populate[downloads][populate]=user&populate[media]=true`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const courseData = response.data?.data;
      setCourse(courseData); // Store full course data
      assignIndividualStates(courseData); // Assign individual states

      setError(null);
    } catch (error) {
      setError("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };

  const assignIndividualStates = (courseData) => {
    if (!courseData) return;

    const attributes = courseData.attributes || {};
    setCourseTitle(attributes.title || "No Title");
    // setCourseCaption(attributes.caption || "No Caption");
    setCourseCategory(attributes.category || "");
    setCourseDescription(attributes.description || "No Description");
    setCourseDuration(attributes.duration || "No Duration");
    setCoursePrice(attributes.price || 0);
    setCourseCreatedAt(new Date(attributes.createdAt).toLocaleDateString());
    setCourseBuys(attributes.buys?.data || []);
    setCourseDownloads(attributes.downloads?.data || []);
    setCourseMedia(attributes.media?.data?.attributes?.url);
  };

  // Remove lesson API
  const deleteLesson = async (lessonId) => {
    const url = `${utils.BASE_URL}contents/${lessonId}`;
    console.log("Sending DELETE request to:", url);
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });
      if (response.status === 200) {
        console.log("Lesson deleted successfully:", response.data);
        toast.success("Lesson deleted successfully!");
        setLessonListings((prev) =>
          prev.filter((lesson) => lesson.id !== lessonId)
        );
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      toast.error("failed to delete course!");
    } finally {
      setLoading(false);
    }
  };
  // Remove offers by ID API
  const deleteOffer = async (offerId) => {
    const url = `${utils.BASE_URL}offers/${offerId}`;
    console.log("Sending DELETE request to:", url);
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });
      if (response.status === 200) {
        console.log("Offer deleted successfully:", response.data);
        toast.success("Offer deleted successfully!");
        fetchOfferCourses();
        // setLessonListings((prev) =>
        //   prev.filter((lesson) => lesson.id !== lessonId)
        // );
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      toast.error("failed to delete offer!");
    } finally {
      setLoading(false);
    }
  };
  // Add Lesson API
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
      console.log("Uploaded video:", file);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    }
  };

  const FullPageSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );

  const handleSaveModule = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!title.trim()) {
      isValid = false;
      setTitleError("Title is required.");
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      isValid = false;
      setDescriptionError("Description is required.");
    } else {
      setDescriptionError("");
    }

    if (!isValid) {
      return;
    }

    setLoading(true);
    setIsDialogOpen(false);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: title,
        description: description,
        users: [1],
        playlists: [],
        course: id,
      })
    );
    if (selectedVideo) {
      formData.append("files.video", selectedVideo);
    }

    if (selectedImage) {
      formData.append("files.thumbnail", selectedImage);
    }
    try {
      const response = await axios.post(
        `http://54.173.110.62:1337/api/contents`,
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
        toast.success("Lesson added successfully!");
        fetchLessonListings();
        setSelectedImage(null);
        setSelectedVideo(null);
        setTitle("");
        setDescription("");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
      console.log("Upload successful:", response.data);
      setUploadProgress(0);
    } catch (error) {
      console.error(
        "Error adding lesson:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error?.message ||
          "Error adding lesson. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditModule = async () => {
    try {
      const formData = new FormData();
      console.log(lessonId);
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          description: description,
        })
      );

      const response = await axios.put(
        `${utils.BASE_URL}contents/${lessonId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      toast.success("Module updated successfully!");

      setIsEditDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update module. Please try again.", error);
    }
  };

  const handlePublishStatusChange = async (lessonId, isPublished) => {
    const url = `${utils.BASE_URL}contents/${lessonId}`;

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

      setLessonListings((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === lessonId
            ? { ...lesson, publishedAt: isPublished ? data.publishedAt : null }
            : lesson
        )
      );

      console.log("Publish status updated:", response.data);
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  console.log(isDialogOpen);
  return (
    <div>
      <section className="flex flex-col  ">
        <div className="flex gap-5 w-full">
          <div className="flex items-center">
            <img
              src={`https://admin.selecthealing.online${courseMedia}`}
              alt="Course Logo"
              className="object-cover max-w-[150px] "
            />
          </div>
          <div className="border-b  border-gray-200 pb-5 flex flex-col  justify-between">
            <div className="flex gap-5 xl:gap-10  items-center">
              <h1 className=" text-xs  md:text-sm lg:text-base xl:text-lg font-semibold">
                {courseTitle}
              </h1>

              {(activeTab === "Offers" || activeTab === "Outline") && (
                <Button
                  className="flex rounded-full py-6 px-6"
                  onClick={
                    activeTab === "Offers"
                      ? () => navigate(`/add-offer/${courseId}`)
                      : handleAddContentClick
                  }
                >
                  {activeTab === "Offers" ? "Add Offer" : "Add Content"}
                </Button>
              )}
            </div>

            <nav className="hidden lg:flex  gap-3 mt-5">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={cn(
                    "pb-3 text-sm font-medium transition-all ",
                    activeTab === tab.name
                      ? "text-red-500 border-b-2 border-red-500"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.name}
                  {tab.count !== undefined && <span> ({tab.count})</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Action Buttons */}{" "}
        <div className="lg:hidden  flex items-center justify-center">
          <nav className="flex  gap-3 mt-5">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={cn(
                  "pb-3 text-sm font-medium transition-all ",
                  activeTab === tab.name
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
                {tab.count !== undefined && <span> ({tab.count})</span>}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <Card className="mt-6 rounded-lg shadow-none border-none">
        {activeTab === "Outline" && (
          <div className="bg-white rounded-2xl p-10  shadow-lg border border-gray-300">
            {lessonListings.length > 0 ? (
              <>
                <div>
                  <div className="relative">
                    <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 font-semibold" />
                    <Input
                      placeholder="Find module or lesson..."
                      className="pl-10 py-6 text-xl font-medium "
                    />
                  </div>
                </div>
                <div className="flex  ">
                  <h2 className="text-lg font-semibold pt-3 px-10">
                    {lessonListings.length}
                    <span className="font-light"> Modules</span>
                  </h2>
                  {/* <div className="ml-auto px-10 flex text-xl  items-center gap-5">
                <Button
                  className="rounded-full text-gray-600 shadow-md py-5 border-gray-700"
                  variant="outline"
                >
                  <span className="text-gray-600">
                    <AiOutlineBars />
                  </span>
                  Expand All
                </Button>
              </div> */}
                </div>

                {/* <div className="flex bg-gray-100 border gap-3  p-4 m-10 mt-0 rounded-xl items-center">
              <span className=" text-gray-500 text-xl">
                <MdInfo />
              </span>
              <div className="flex  items-center">
                <h1 className="text-lg font-medium text-gray-600">
                  Courses now with live video sessions
                </h1>
              </div>
              <span className="text-lg font-medium text-gray-600 ml-auto">
                Enable in Settings
              </span>
            </div> */}
                <div className="m-10">
                  <Accordion
                    type="single"
                    className="flex flex-col gap-3"
                    collapsible
                  >
                    {lessonListings?.map((lesson, key) => {
                      return (
                        <AccordionItem
                          key={lesson.id}
                          value={`item-${lesson.id}`}
                        >
                          <AccordionTrigger className="p-6 relative border border-b-0 text-lg flex items-center gap-2 rounded-t-lg">
                            <PiFolderLight />

                            <span className="flex-1 text-gray-700 ">
                              {lesson.description}
                            </span>

                            <span className="flex 1 text-gray-700">
                              <div className="bg-green-200 text-green-800 rounded-full">
                                <DropdownMenu>
                                  <DropdownMenuTrigger>
                                    <div className="flex items-center gap-2 text-sm px-3 py-1 hover: border-none  ">
                                      <FaCheck />
                                      {lesson.publishedAt !== null
                                        ? "Published"
                                        : "Unpublished"}
                                      <RiArrowDropDownLine className="text-3xl" />
                                    </div>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                      Status
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handlePublishStatusChange(
                                          lesson.id,
                                          true
                                        )
                                      }
                                    >
                                      Published
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handlePublishStatusChange(
                                          lesson.id,
                                          false
                                        )
                                      }
                                    >
                                      Unpublished
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="text-gray-500 hover:text-black">
                                <HiDotsHorizontal className="" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-white border border-gray-300 rounded-md shadow-lg w-40">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setIsEditDialogOpen(true);
                                    setLessonId(lesson.id);
                                  }}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    confirmAndDelete(
                                      "Are you sure you want to delete this lesson?",
                                      () => deleteLesson(lesson.id)
                                    )
                                  }
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>

                              {/* edit lesson */}
                              {isEditDialogOpen && (
                                <Dialog
                                  open={isEditDialogOpen}
                                  onOpenChange={setIsEditDialogOpen}
                                >
                                  <DialogContent className="mx-4 max-h-screen overflow-y-auto sm:max-w-xl sm:mx-auto my-auto">
                                    <DialogHeader>
                                      <DialogTitle>
                                        <div className="mb-5 leading-6 text-xl">
                                          Edit Lesson
                                        </div>
                                      </DialogTitle>
                                      <DialogDescription>
                                        <div>
                                          {/* Title Input */}
                                          <div className="mt-2 mb-4">
                                            <label className="text-medium mb-2 font-semibold text-black">
                                              Title
                                            </label>
                                            <Input
                                              value={title}
                                              onChange={(e) =>
                                                setTitle(e.target.value)
                                              }
                                              placeholder="Enter title here"
                                            />
                                          </div>

                                          {/* Description Input */}
                                          <div className="mt-2 mb-4">
                                            <label className="text-medium mb-2 font-semibold text-black">
                                              Description
                                            </label>
                                            <Textarea
                                              value={description}
                                              onChange={(e) =>
                                                setDescription(e.target.value)
                                              }
                                              placeholder="Type your description here."
                                            />
                                          </div>

                                          {/* <div className="border">
                                        <div className="m-2">
                                          <img
                                            src={
                                              selectedImage
                                                ? URL.createObjectURL(
                                                    selectedImage
                                                  )
                                                : img2
                                            }
                                            alt="Descriptive Content"
                                            className="w-full h-auto rounded-md"
                                          />
                                        </div>
                                      </div>
                                      <p className="mt-2 mb-5">
                                        Please use .jpg or .png with a
                                        non-transparent background.
                                      </p>
                                      <p>Recommended dimensions: 1280x720</p> */}

                                          {/* Image Upload Button */}
                                          {/* <div className="flex gap-4">
                                        <Button
                                          variant="outline"
                                          className="rounded-full py-5 mt-3"
                                          onClick={() =>
                                            document
                                              .getElementById("image-upload")
                                              .click()
                                          }
                                        >
                                          Select Image
                                        </Button>
                                        <input
                                          id="image-upload"
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={handleImageChange}
                                        />
                                      </div> */}

                                          {/* Cancel and Save Buttons */}
                                          <div className="flex justify-end gap-4 mt-5">
                                            <Button
                                              variant="outline"
                                              className="rounded-full py-5"
                                              onClick={() =>
                                                setIsEditDialogOpen(false)
                                              } // Close the dialog
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                              className="rounded-full py-5"
                                              onClick={() => handleEditModule()}
                                            >
                                              Update Module
                                            </Button>
                                          </div>
                                        </div>
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </DropdownMenu>
                          </AccordionTrigger>
                          <AccordionContent className=" p-6 border border-b-0 text-base rounded-b-lg flex items-center gap-2  ">
                            <CiVideoOn />
                            {lesson.video && lesson.video.url ? (
                              <button
                                onClick={() => openVideoModal(lesson.video.url)}
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
                      );
                    })}
                  </Accordion>
                </div>
                {/* Simple Modal */}
                {isVideoModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl">
                      <div className="p-4 border-b border-gray-300">
                        <h2 className="text-xl font-semibold">
                          Video Workshop
                        </h2>
                      </div>
                      <div className="p-4">
                        <video
                          controls
                          width="100%"
                          height="400px"
                          className="rounded-lg"
                        >
                          <source
                            src={`https://admin.selecthealing.online${selectedVideoUrl}`}
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
                {/* Dialog Component */}
              </>
            ) : (
              <h2 className="text-lg font-semibold">No Lessons Available!</h2>
            )}
            {isDialogOpen && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="mx-4 max-h-screen overflow-y-auto sm:max-w-xl sm:mx-auto my-auto">
                  <DialogHeader>
                    <DialogTitle>
                      <div className="mb-5 leading-6 text-xl">Add Content</div>
                    </DialogTitle>
                    <DialogDescription>
                      <div>
                        {/* Title Field */}
                        <div className="mt-2 mb-4">
                          <div className="text-medium mb-2 font-semibold text-black">
                            Title
                          </div>
                          <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title here"
                          />
                          {titleError && (
                            <p className="text-red-500 text-sm mt-1">
                              {titleError}
                            </p>
                          )}
                        </div>

                        {/* Description Field */}
                        <div className="mt-2 mb-4">
                          <div className="text-medium mb-2 font-semibold text-black">
                            Description
                          </div>
                          <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Type your message here."
                          />
                          {descriptionError && (
                            <p className="text-red-500 text-sm mt-1">
                              {descriptionError}
                            </p>
                          )}
                        </div>

                        {/* Image Upload Section */}
                        <div className="border">
                          <div className="m-2">
                            {selectedImage ? (
                              <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Descriptive Content"
                                className="w-full h-auto rounded-md"
                              />
                            ) : (
                              <div className="w-full h-36 bg-gray-200 rounded-md flex items-center justify-center">
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
                                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                  <path d="M21 15l-5-5L5 21"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 mb-5">
                          Please use .jpg or .png with a non-transparent
                          background.
                        </div>
                        <div>Recommended dimensions: 1280x720</div>

                        {/* File Upload Buttons */}
                        <div className="flex gap-4">
                          <Button
                            variant="outline"
                            className="rounded-full py-5 mt-3"
                            onClick={() =>
                              document.getElementById("image-upload").click()
                            }
                          >
                            Select Image
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          <Button
                            variant="outline"
                            className="rounded-full py-5 mt-3"
                            onClick={() =>
                              document.getElementById("video-upload").click()
                            }
                          >
                            Select Video
                          </Button>
                          <input
                            id="video-upload"
                            type="file"
                            className="hidden"
                            onChange={handleVideoUpload}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                          <Button
                            variant="outline"
                            className="rounded-full py-5 mt-3"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="rounded-full py-5 mt-3"
                            onClick={handleSaveModule}
                            disabled={loading}
                          >
                            Save Module
                          </Button>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}

            {/* Full-Page Spinner */}
            {loading && <FullPageSpinner />}
          </div>
        )}
        {activeTab === "Offers" && (
          <div className="bg-white rounded-2xl p-10  shadow-lg border border-gray-300">
            {offerData.length > 0 ? (
              <div className="mb-5 flex justify-between items-center border-gray-200">
                <h2 className="text-lg font-semibold">
                  {offerData.length}
                  <span className="text-base font-normal"> Offers</span>
                </h2>
              </div>
            ) : (
              <h2 className="text-lg font-semibold">No Offers Available!</h2>
            )}

            {/* Offer Cards */}
            {offerData?.map((offer) => (
              <div
                key={offer.id}
                className="flex flex-col md:flex-row items-center gap-4 mb-4 animate-fadeIn"
              >
                <img
                  src={`https://admin.selecthealing.online${offer.attributes?.course.data.attributes?.media?.data?.attributes?.url}`}
                  alt="Offer Thumbnail"
                  className="w-32 h-20 rounded-lg object-cover shadow-md"
                />

                <div className="flex-1">
                  <Link
                    to={{
                      pathname: `/offer-details/${offer.id}`,
                    }}
                    state={{ courseId: courseId }}
                    className="text-lg font-medium hover:text-purple-700 text-gray-800 mb-2"
                  >
                    {offer.attributes.course.data.attributes.title}
                  </Link>
                  <div className="flex gap-3 items-center">
                    <IoPricetagOutline />
                    <p className="text-gray-800 font-semibold">
                      <del class="text-gray-400">
                        {offer.attributes.course.data.attributes.price} USD
                      </del>
                      <span> ${offer?.attributes?.price} USD </span>
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-gray-500 hover:text-black">
                    <HiDotsHorizontal className="" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 rounded-md shadow-lg w-40">
                    <Link
                      to={{
                        pathname: `/offer-details/${offer.id}`,
                      }}
                      state={{ courseId: courseId }}
                    >
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={() =>
                        confirmAndDelete(
                          "Are you sure you want to delete this offer?",
                          () => deleteOffer(offer.id)
                        )
                      }
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>

                  {/* Dialog Component */}
                  {isEditDialogOpen && (
                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogContent className="mx-4 max-h-screen overflow-y-auto sm:max-w-xl sm:mx-auto my-auto">
                        <DialogHeader>
                          <DialogTitle>
                            <div className="mb-5 leading-6 text-xl">
                              Edit course
                            </div>
                          </DialogTitle>
                          <DialogDescription>
                            <div>
                              {/* Title Input */}
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

                              {/* Description Input */}
                              <div className="mt-2 mb-4">
                                <label className="text-medium mb-2 font-semibold text-black">
                                  Description
                                </label>
                                <Textarea
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  placeholder="Type your description here."
                                />
                              </div>
                              <div className="flex justify-end gap-4 mt-5">
                                <Button
                                  variant="outline"
                                  className="rounded-full py-5"
                                  onClick={() => setIsEditDialogOpen(false)} // Close the dialog
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="rounded-full py-5"
                                  onClick={() => handleEditModule()}
                                >
                                  Update Module
                                </Button>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Customers" && (
          <div className="bg-white rounded-2xl p-10  shadow-lg border border-gray-300">
            {courseBuys?.length > 0 ? (
              <div className="flex flex-col gap-6">
                <section class="container mx-auto p-6 font-mono">
                  <div className="mb-5 flex gap-3 items-center border-gray-200">
                    <h2 className="text-2xl font-medium">Customers</h2>
                    <h2 className="px-2 py-1  font-semibold leading-tight text-gray-700  border rounded-sm">
                      {courseBuys?.length} <span>Customers</span>
                    </h2>
                  </div>
                  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div class="w-full overflow-x-auto">
                      <table class="w-full">
                        <thead>
                          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  border-b border-gray-600">
                            <th class="px-4 py-3 flex gap-3 items-center">
                              <div class="flex items-center">
                                <input
                                  id="checkbox-all"
                                  type="checkbox"
                                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label for="checkbox-all" class="sr-only">
                                  checkbox
                                </label>
                              </div>
                              Name
                            </th>

                            <th class="px-4 py-3">Email Address</th>
                            <th class="px-4 py-3">Role</th>
                            <th class="px-4 py-3">Enrolled at</th>
                            <th class="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody class="bg-white">
                          {courseBuys?.map((buy, index) => {
                            return (
                              <tr class="text-gray-700">
                                <td class="px-4 py-3 border">
                                  <div class="flex items-center gap-3 text-sm">
                                    <div class="w-4">
                                      <div class="flex items-center">
                                        <input
                                          id="checkbox-table-1"
                                          type="checkbox"
                                          class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                          for="checkbox-table-1"
                                          class="sr-only"
                                        >
                                          checkbox
                                        </label>
                                      </div>
                                    </div>
                                    <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                                      <img
                                        class="object-cover w-full h-full rounded-full"
                                        src={
                                          buy.attributes.user?.data?.attributes
                                            ?.picture || placeholderImage
                                        }
                                        alt="user picture"
                                        loading="lazy"
                                      />
                                      <div
                                        class="absolute inset-0 rounded-full shadow-inner"
                                        aria-hidden="true"
                                      ></div>
                                    </div>
                                    <div>
                                      <p class="font-semibold text-black">
                                        {buy.attributes.user?.data?.attributes
                                          ?.fname || "User Name"}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="px-4 py-3 text-ms font-semibold border">
                                  {buy.attributes.user?.data?.attributes
                                    ?.email || "User Email"}
                                </td>
                                <td class="px-4 py-3 text-xs border">
                                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                                    Team member
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm border">
                                  {new Date(
                                    buy?.attributes?.updatedAt
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }) || ""}
                                </td>
                                <td class="px-4 py-3 text-ms font-semibold border">
                                  <RiDeleteBinLine />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <h2 className="text-lg font-semibold">No Customers Available!</h2>
            )}
          </div>
        )}

        {activeTab === "Settings" && (
          <div>
            <CourseSettingsTab
              courseTitle={courseTitle}
              courseDescription={courseDescription}
              courseMedia={courseMedia}
              courseId={courseId}
              courseCategory={courseCategory}
              coursePrice={coursePrice}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default CourseDetails;
