import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MdInvertColorsOff, MdOutlinePaid } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";
import { TbLetterKSmall } from "react-icons/tb";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FaApple, FaGooglePay } from "react-icons/fa";
import { SiAfterpay, SiKlarna } from "react-icons/si";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IoWalletOutline } from "react-icons/io5";
import { Checkbox } from "../ui/checkbox";

import { LuExternalLink } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import utils from "../utils/utils";
const LeftContentArea = ({
  formData,
  onInputChange,
  step,
  handleNext,
  handleBack,
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
}) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [duration, setDuration] = useState(22);
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const validateFields = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (selectedButton === "paid" && (!price || parseFloat(price) <= 0)) {
      newErrors.price = "Please enter a valid price for a paid course.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailImage(reader.result);
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchToken = async () => {
    try {
      const response = await axios.get("http://54.173.110.62:4000/get-token");
      return response.data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      toast.error("Failed to fetch token. Please try again.");
      return null;
    }
  };

  const sendNotification = async (token) => {
    try {
      const notificationData = {
        message: {
          topic: "all_users",
          notification: {
            title: "New Course Added",
            body: `A new course titled "${title}" has been added.`,
          },
        },
      };

      await axios.post("https://fcm.googleapis.com/v1/projects/select-healing/messages:send", notificationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Notification sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification. Please try again.");
    }
  };

  const handleSaveModule = async () => {
    if (!validateFields()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    try {
      const formData = new FormData();
      console.log(title, description, category);
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          description: description,
          caption: caption,
          type: category,
          // duration: duration,
          price: price || 0,
        })
      );

      if (selectedImage) {
        formData.append("files.media", selectedImage);
      }
      const response = await axios.post(`${utils.BASE_URL}courses`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${utils.token}`,
        },
      });

      const token = await fetchToken();
      await sendNotification(token);

      navigate("/courses");
      toast.success("Course saved successfully!");
      // setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course. Please try again.");
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !validateFields()) {
      return;
    }
    handleNext();
    scrollToTop();
  };

  return (
    <div className="w-full p-6  rounded-lg">
      {/* Step 1: Course Details */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Course Details
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We'll use your title and description to generate a sample course
            outline.
          </p>
          <form className="space-y-6">
            <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="courseName"
              >
                Title
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                // value={formData.courseName}
                // onChange={onInputChange}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Examples: Public Speaking 101, Learning piano..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold mt-5 text-gray-800">
                Select Category
              </h2>
              <div>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full py-2 mt-1">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Courses">Courses</SelectItem>
                    <SelectItem value="Classes">Classes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm">{errors.category}</p>
                )}
              </div>
            </div>
            <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="courseDescription"
              >
                Brief Description
              </label>
              <div>
                <Textarea
                  id="courseDescription"
                  name="courseDescription"
                  // value={formData.courseDescription}
                  // onChange={onInputChange}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Example: Learn the skills required to "
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold">Thumbnail image (optional)</h2>
              <div className="border rounded-lg p-6 flex  flex-col items-center gap-10">
                {thumbnailImage ? (
                  <img
                    src={thumbnailImage}
                    alt="Selected Thumbnail"
                    className="w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-56 h-56 bg-gray-200 rounded-md flex items-center justify-center">
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
                <div className="flex flex-col gap-10 items-center">
                  <Label className="bg-white rounded-full hover:bg-gray-100 font-medium text-gray-700 py-2 px-6 shadow-md border-gray-200 border-[1px] cursor-pointer">
                    <h2 className="flex items-center justify-center gap-3">
                      <span> Choose thumbnail</span>{" "}
                      <ChevronDown className="size-7" />
                    </h2>
                    <Input
                      type="file"
                      accept="image/*"
                      // onChange={handleThumbnailImage}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </Label>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
      {/* Step 2: Course Appearance */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Price Your Course
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Choose whether this Course is paid or free. If it's paid, set its
            price and payment options. Don't worry, you can change this later!
          </p>
          <div className="  sm:flex mt-5  sm:justify-around  ">
            <Button
              variant="outline"
              className={`px-24 py-10 mb-5  md:mx-5 lg:mx-0  lg:px-20 xl:px-28 2xl:px-36 shadow-md rounded-3xl ${
                selectedButton === "free" ? "border-4 border-gray-800" : ""
              }`}
              onClick={() => setSelectedButton("free")}
            >
              <p className="flex  items-center gap-1">
                <IoGiftOutline /> Free
              </p>
            </Button>

            <Button
              variant="outline"
              className={`px-24  lg:mt-0 py-10 lg:px-20 xl:px-28 2xl:px-36 shadow-md rounded-3xl ${
                selectedButton === "paid" ? "border-4 border-gray-800" : ""
              }`}
              onClick={() => setSelectedButton("paid")}
            >
              <p className="flex  items-center gap-1">
                <MdOutlinePaid /> Paid
              </p>
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-semibold mt-5 text-gray-800">
              Payment Frequency
            </h2>
            <div className="">
              <Select
                defaultValue="one-time"
                disabled={selectedButton !== "paid"}
              >
                <SelectTrigger className="w-full py-10 mt-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">
                    <div className="flex items-start space-x-2">
                      <span className="flex  bg-blue-50 p-3 justify-center items-center rounded-md">
                        <IoWalletOutline className="text-blue-500 text-lg" />
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="font-semibold block">
                          One-Time Payment
                        </span>
                        <span className="text-gray-500 text-sm block">
                          Customer Pays once to access for production.
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="subscription">
                    <div className="flex items-start space-x-2">
                      <span className="flex  bg-blue-50 p-3 justify-center items-center rounded-md">
                        <IoWalletOutline className="text-blue-500 text-lg" />
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="font-bold block">Monthly Payment</span>
                        <span className="text-gray-500 text-sm block">
                          Customer Pays once to access for production.
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="custom">
                    <div className="flex items-start space-x-2">
                      <span className="flex  bg-blue-50 p-3 justify-center items-center rounded-md">
                        <IoWalletOutline className="text-blue-500 text-lg" />
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="font-bold block">Yearly Payment</span>
                        <span className="text-gray-500 text-sm block">
                          Customer Pays once to access for production.
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h2 className="text-lg font-semibold mt-5 text-gray-800">
                Price
              </h2>
              <div className="">
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="py-7 rounded-xl"
                  type="number"
                  disabled={selectedButton !== "paid"}
                ></Input>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Pricing */}
      {step === 2 && <></>}
      <div className="flex justify-end mt-5 mb-10">
        {step > 1 && (
          <Button
            variant="outline"
            className="py-2 rounded-full mr-auto text-sm font-medium"
            onClick={() => {
              handleBack();
              scrollToTop();
            }}
          >
            Back
          </Button>
        )}
        {step !== 2 ? (
          <Button
            type="button"
            className="py-2 rounded-full text-sm font-medium"
            onClick={handleNextStep}
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            className="py-2 ml-3 rounded-full bg-blue-400 text-sm font-medium"
            onClick={handleSaveModule}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default LeftContentArea;
