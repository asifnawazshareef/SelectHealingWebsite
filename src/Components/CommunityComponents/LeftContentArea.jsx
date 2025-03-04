import { useEffect, useState } from "react";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Lock, Rss } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import utils from "../../utils/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Download, Mic } from "lucide-react";
import { Skeleton } from "../../ui/skeleton";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  FaRegFolderOpen,
  FaDropbox,
  FaGoogleDrive,
  FaLink,
  FaCamera,
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
const LeftContentArea = ({
  formData,
  onInputChange,
  validateStep1,
  validateStep2,
  validateStep3,
  step,
  handleNext,
  handleBack,
  title,
  setTitle,
  description,
  setDescription,
  author,
  setAuthor,
  caption,
  setCaption,
  courses,
  errors,
  selectedDay,
  setSelectedDay,
  selectedTime,
  setSelectedTime,
  selectedCourseId,
  setSelectedCourseId,
  previewSelectedImage,
  setPreviewSelectedImage,
  setCourses,
  daysOfWeek
}) => {
  const Navigate = useNavigate();
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [author, setAuthor] = useState("");

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  useEffect(() => {
    if (courses && courses.length > 0) {
      setSelectedCourseId(courses[0].id); // Set the first course as default
    }
  }, [courses, setSelectedCourseId]);

  const handleCourseChange = (courseId) => {
    setSelectedCourseId(courseId); // Update the selected course ID
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You selected ${selectedDay} at ${selectedTime}`);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [episodeOrder, setEpisodeOrder] = useState("episode"); // Default selected option

  const handleEpisodeOrderChange = (value) => {
    setEpisodeOrder(value);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  // Add Community API
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setPreviewSelectedImage(imageUrl);
      togglePopup();
    }
  };
  const handleAddCommunity = async () => {
    if (validateStep3()) {
    if (!daysOfWeek.includes(selectedDay)) {
      toast.error("Please select a valid day.");
      return; // Stop the submission if the day is invalid
    }

    const formattedTime = selectedTime
      ? `${selectedTime}:00.000` // Ensure milliseconds are included
      : "00:00:00.000"; // Default time if none is selected

    try {
      const formData = new FormData();

      // Ensure title, caption, time, and day are set correctly
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          caption: caption,
          time: formattedTime, // Combine day and time in ISO format
          day: selectedDay,
          course: selectedCourseId, // Example course ID, replace with the actual selected course ID
          going: 0,
        })
      );

      // Attach the media file if provided
      if (selectedImage) {
        formData.append("files.media", selectedImage);
      }

      // Send POST request to add the community
      const response = await axios.post(
        `${utils.BASE_URL}communities`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      // Notify success
      toast.success("Community saved successfully!");
      Navigate("/community");
    } catch (error) {
      console.error("Error saving community:", error);
      toast.error("Failed to save community. Please try again.");
    }
  }
  };  

  return (
    <div className="w-full p-6  rounded-lg">
      {/* Step 1: community Details */}
      {/* {step === 1 && (
        <>
          <h2 className="text-lg font-semibold mb-4 md:mb-8 text-gray-800">
            Choose how you want to make your community
          </h2>
          <Card className="mb-6 border-4 border-gray-800">
            <div className="flex gap-3 p-5 text-xl items-center">
              <CardHeader>
                <Mic />
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="mb-2 text-base">
                  Create a new Community
                </CardTitle>
                <CardDescription>
                  Setup up your Community from scratch
                </CardDescription>
              </CardContent>
            </div>
          </Card>

          <Card>
            <div className="flex gap-3 p-5 text-xl items-center">
              <CardHeader>
                <Download />
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="mb-2 text-base">
                  Import a Community
                </CardTitle>
                <CardDescription>
                  Switch your existing Community Healing.
                </CardDescription>
              </CardContent>
            </div>
          </Card>
        </>
      )} */}
      {/* Step 2: Course Appearance */}
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Create a new Community
          </h2>
          <p className="text-sm text-gray-800 font-medium mb-6">
            Community Details
          </p>
          <form className="space-y-6">
            <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="communityName"
              >
                Title
              </label>
              <input
                type="text"
                id="communityName"
                name="communityName"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Community title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="communityCaption"
              >
                Brief Caption
              </label>
              <div>
                <Textarea
                  id="communityCaption"
                  name="communityCaption"
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  placeholder="Brief caption"
                  rows="3"
                />
                 {errors.caption && <p className="text-red-500 text-sm">{errors.caption}</p>}
              </div>
            </div>
            {/* <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="communityName"
              >
                Choose course
              </label> */}
            {/* <input
                type="text"
                id="communityAuthor"
                name="communityName"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Host"
              /> */}
            {/* <Select
                onValueChange={(value) => setAuthor(value)}
                defaultValue=""
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose an course" value={author} />
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
            </div> */}

            {/* <div>
              <label
                className="block text-base font-medium text-gray-700 mb-4"
                htmlFor=""
              >
                Community Availabilty
              </label>

              <Card className="mb-4">
                <div className="flex gap-3 p-5 text-xl ">
                  <CardHeader>
                    <Rss />
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardTitle className="mb-2 text-base">Public</CardTitle>
                    <CardDescription>
                      Anyone can acces this community on their favorite listning
                      apps for free.
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>

              <Card>
                <div className="flex gap-4 p-5 text-xl ">
                  <CardHeader>
                    <Lock />
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardTitle className="mb-2 text-base">Private</CardTitle>
                    <CardDescription>
                      Paid subscribers can access this community on their own
                      private feed.
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            </div> */}
          </form>
        </>
      )}

      {/* Step 3: Pricing */}
      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Configure your community settings
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Set your community's day and time, and course order
          </p>
          <div>
            {/* <h2 className="text-base font-semibold mt-5 text-gray-800">
              Community Language
            </h2> */}
            {/* <div>
              <Select defaultValue="english">
                <SelectTrigger className="w-full py-2 mt-1">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <h2 className="text-base font-semibold mt-5 text-gray-800">
                Select Course
              </h2>
              <div>
                <Select
                  value={selectedCourseId} // Bind the selected course
                  onValueChange={handleCourseChange}
                >
                  <SelectTrigger className="w-full py-2 mt-1">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Select Course</SelectItem>
                    {courses?.map((course) => (
                      <SelectItem key={course?.id} value={course?.id}>
                        {course?.attributes?.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <h1 className="text-xl font-semibold mb-2 text-gray-800">
                Select Day and Time
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Day Selector */}
                <div>
                  <label
                    htmlFor="day"
                    className="text-base font-semibold mt-5 text-gray-800"
                  >
                    Select Day
                  </label>
                  <select
                    id="day"
                    value={selectedDay}
                    onChange={handleDayChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                  >
                    <option value="">-- Choose a day --</option>
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  {errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
                </div>

                {/* Time Selector */}
                <div>
                  <label
                    htmlFor="time"
                    className="text-base font-semibold mt-5 text-gray-800"
                  >
                    Select Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                  />
                    {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                </div>
              </form>

              {/* Display Selection */}
              {selectedDay && selectedTime && (
                <div className="mt-6 text-center">
                  <h2 className="text-lg font-semibold">Your Selection:</h2>
                  <p>
                    <strong>Day:</strong> {selectedDay}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedTime}
                  </p>
                </div>
              )}
            </div>
            {/* <div className="mt-5">
              <div
                className={`mb-4 border-4 cursor-pointer ${
                  episodeOrder === "episode"
                    ? "border-gray-800"
                    : "border-transparent"
                }`}
                onClick={() => handleEpisodeOrderChange("episode")}
              >
                <div className="flex gap-3 p-5 items-center">
                  <CardHeader>
                    <RadioGroup value={episodeOrder}>
                      <RadioGroupItem
                        value="episode"
                        id="episodeOrder"
                        checked={episodeOrder === "episode"}
                        onChange={() => handleEpisodeOrderChange("episode")}
                      />
                    </RadioGroup>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardTitle className="mb-1 text-base">
                      List in episode order
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Episodes will appear from newest to oldest.
                    </CardDescription>
                  </CardContent>
                </div>
              </div>

              <div
                className={`border-4 cursor-pointer ${
                  episodeOrder === "serial"
                    ? "border-gray-800"
                    : "border-transparent"
                }`}
                onClick={() => handleEpisodeOrderChange("serial")}
              >
                <div className="flex gap-4 p-5 items-center">
                  <CardHeader>
                    <RadioGroup value={episodeOrder}>
                      <RadioGroupItem
                        value="serial"
                        id="serialOrder"
                        checked={episodeOrder === "serial"}
                        onChange={() => handleEpisodeOrderChange("serial")}
                      />
                    </RadioGroup>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardTitle className="mb-1 text-base">
                      List in serial order
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Episodes will appear from oldest to newest, split up by
                      season.
                    </CardDescription>
                  </CardContent>
                </div>
              </div>
            </div> */}
          </div>
        </>
      )}

      {/* Step 4: appearance */}
      {step === 3 && (
        <>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Customized your community's appearance
          </h2>
          <p className="text-[13px] text-gray-600 mb-6">
            Choose and color and image to help brand your community. These will
            be shown at checkout and throughout the memeber experience.
          </p>
          <div>
            <div className="mt-5">
              <Card>
                <div className="flex justify-between flex-col gap-4 p-6">
                  <CardHeader>
                    {previewSelectedImage ? (
                      <img
                        src={previewSelectedImage}
                        className="object-cover w-full h-auto rounded-md bg-gray-400"
                      />
                    ) : (
                      <Skeleton className="h-40 w-full rounded-md bg-gray-400" />
                    )}
                  </CardHeader>
                  <CardContent className="p-0 flex flex-col justify-between">
                    <CardDescription className="text-base mb-2">
                      File formats accepted:
                      <span className="font-bold"> jpg, png</span>
                    </CardDescription>
                    <Button
                      onClick={togglePopup}
                      className="py-1 px-4 text-gray-900 bg-gray-300 hover:bg-gray-400 rounded-full text-sm font-medium "
                    >
                      Upload an Image
                      <RiArrowDropDownLine />
                    </Button>
                    {showPopup && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <div className="bg-white rounded-lg p-6 sm:p-10 w-11/12 max-w-4xl h-[90vh] relative shadow-lg animate-fadeIn">
                          <section className="flex flex-col gap-6 h-full">
                            <div className="flex justify-between items-center">
                              <h2 className="text-2xl font-semibold text-gray-800">
                                Upload File
                              </h2>
                              <button
                                onClick={togglePopup}
                                className="font-medium text-lg text-gray-600 hover:text-gray-800 flex items-center gap-1"
                              >
                                {/* <span>Close</span>  */}
                                <IoClose />
                              </button>
                            </div>
                            <div className="border-dashed border-2 px-4 py-6 sm:py-10 rounded-xl border-gray-300 h-full flex flex-col items-center justify-center gap-5">
                              <h3 className="text-center text-xl sm:text-2xl font-medium text-gray-800">
                                Drop files here,&nbsp;
                                <span className="text-blue-600 border-b border-blue-300 cursor-pointer">
                                  browse files&nbsp;
                                </span>
                                or import from:
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg sm:max-w-2xl">
                                <label className="group flex flex-col items-center justify-center gap-3 p-3 bg-white border-2 border-black rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                                  <div className="bg-blue-500 text-white rounded-full p-2 group-hover:bg-blue-600">
                                    <FaRegFolderOpen size={24} />
                                  </div>
                                  <h4 className="font-medium text-sm text-gray-700">
                                    My Device
                                  </h4>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                  />
                                </label>
                                <div className="group flex flex-col items-center justify-center gap-3 p-3 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300">
                                  <div className="bg-orange-500 text-white rounded-full p-2 group-hover:bg-orange-600">
                                    <FaLink size={24} />
                                  </div>
                                  <h4 className="font-medium text-sm text-gray-700">
                                    Link
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    )}
                     {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image}</p>
          )}
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-4 mt-5 mb-10">
        {step > 1 && (
          <Button
            variant="outline"
            className="  py-2 rounded-full mr-auto text-sm font-medium "
            onClick={() => {
              handleBack(), scrollToTop();
            }}
          >
            Go Back
          </Button>
        )}
        {step !== 3 ? (
          <Button
            type="button"
            className="w-full py-2 rounded-full text-sm font-medium "
            onClick={() => {
              handleNext(), scrollToTop();
            }}
          >
            Continue
          </Button>
        ) : (
          <Button
            type="button"
            className="w-full py-2 rounded-full text-sm font-medium "
            onClick={handleAddCommunity}
          >
            Save
          </Button>
        )}
        
      </div>
    </div>
  );
};

export default LeftContentArea;
