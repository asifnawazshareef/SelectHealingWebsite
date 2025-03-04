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

const LeftContentAreaCommunity = ({
  formData,
  onInputChange,
  step,
  handleNext,
  handleBack,
}) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleThumbnailImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full p-6  rounded-lg">
      {/* Step 1: Community Details */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Community Details
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Let members know what your community is all about.
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
                value={formData.courseName}
                onChange={onInputChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Give your community a title"
              />
            </div>

            <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="courseDescription"
              >
                Description
              </label>
              <div>
                <Textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={formData.courseDescription}
                  onChange={onInputChange}
                  placeholder="Enter a description..."
                />
              </div>
            </div>

            {/* <div>
              <div className="flex items-start gap-3">
                <Switch />
                <div className="flex flex-col">
                  <span>
                    Use this info to generate content and additional resources
                  </span>
                  <p className="mt-1 cursor-pointer flex underline items-center gap-2">
                    Learn more{" "}
                    <span>
                      <LuExternalLink />
                    </span>
                  </p>
                </div>
              </div>
            </div> */}
          </form>
        </>
      )}
      {/* Step 2: Course Appearance */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Customize your course's appearance
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            The primary branding for your course displayed at checkout and
            throughout the member experience
          </p>

          <Card>
            <div className="flex p-8 text-xl items-center">
              <CardHeader>
                <CardTitle>Primary Color</CardTitle>
                <CardDescription>
                  Applies to the button and Links
                </CardDescription>
              </CardHeader>
              <div className="  ml-auto    ">
                <CardContent className="p-0">
                  <p className="border p-4  rounded-full bg-gray-100 text-xl  ">
                    <MdInvertColorsOff />
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
          <Card className="mt-6">
            <div className="flex p-8 text-xl items-center">
              <CardHeader>
                <CardTitle>Accent Color</CardTitle>
                <CardDescription>Applies to the header</CardDescription>
              </CardHeader>
              <div className="  ml-auto    ">
                <CardContent className="p-0">
                  <p className="border p-4  rounded-full bg-gray-100 text-xl  ">
                    <MdInvertColorsOff />
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
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
                <div className="w-[80%] h-36 bg-gray-200 rounded-md flex items-center justify-center">
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
                <p className="text-base font-medium text-gray-500 ">
                  Recommended dimensions of
                  <strong> 1280×720</strong>
                </p>
                <Label className="bg-white rounded-full hover:bg-gray-100 font-medium text-gray-700 py-2 px-6 shadow-md border-gray-200 border-[1px] cursor-pointer">
                  <h2 className="flex items-center justify-center gap-3">
                    <span> Choose thumbnail</span>{" "}
                    <ChevronDown className="size-7" />
                  </h2>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailImage}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Pricing */}
      {step === 3 && (
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
              <Select defaultValue="one-time">
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
                <Input className="py-7 rounded-xl"></Input>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex gap-3 mt-5 mb-10">
        <Button
          variant="outline"
          className="  py-2 rounded-md mr-auto text-sm font-medium "
          onClick={() => {
            handleBack(), scrollToTop();
          }}
        >
          Go Back
        </Button>
        <Button
          type="button"
          className=" py-2 w-full rounded-md text-sm font-medium "
          onClick={() => {
            handleNext(), scrollToTop();
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default LeftContentAreaCommunity;
