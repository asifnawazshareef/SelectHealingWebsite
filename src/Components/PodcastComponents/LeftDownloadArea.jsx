import { useEffect, useState } from "react";
import { Switch } from "../../ui/switch";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { MdInvertColorsOff, MdOutlinePaid } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";
import { TbLetterKSmall } from "react-icons/tb";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { FaApple, FaGooglePay } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";

import { SiAfterpay, SiKlarna } from "react-icons/si";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { IoWalletOutline } from "react-icons/io5";
import { Checkbox } from "../../ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import { Input } from "../../ui/input";
import { LuDownload } from "react-icons/lu";

const LeftDownloadArea = ({
  formData,
  onInputChange,
  step,
  handleNext,
  handleBack,
}) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full flex-1 p-6  rounded-lg">
      {/* Step 1: Download Details */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Download Details
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Create your download to share your knowledge and start monetizing
            your audience.
            <span className=" pl-2 text-blue-600 font-semibold underline">
              Learn More
            </span>
          </p>

          <form className="space-y-6">
            <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="downloadName"
              >
                Title
              </label>
              <input
                type="text"
                id="downloadName"
                name="downloadName"
                value={formData.downloadName}
                onChange={onInputChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a title..."
              />
            </div>

            <div>
              <label
                className="block text-base font-medium text-gray-700 mb-1"
                htmlFor="downloadDescription"
              >
                Brief Description
              </label>
              <div>
                <Textarea
                  id="downloadDescription"
                  name="downloadDescription"
                  value={formData.downloadDescription}
                  onChange={onInputChange}
                  placeholder="Describe the file(s) in this offer..."
                />
              </div>
            </div>
            <div className="mt-5">
              <h2 className="font-bold">Thumbnail image (optional)</h2>
              <div className="border rounded-xl w-full ">
                <div className=" bg-gray-200 flex h-32 w-1/2 items-center rounded-lg justify-center xl:ml-24 ml-16 mt-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-[#b2b0ae]"
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
                <div className="m-10">
                  <p className="text-gray-500 mb-5">
                    Recommended dimensions of 1280x720
                  </p>
                  <Button variant="outline" className="rounded-full px-5">
                    Choose Thumnail
                    <IoIosArrowDown />
                  </Button>
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
            Add Your files
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Add files to create a robust set of resources for your members to
            download.{" "}
            <span className="text-blue-600 text-lg font-semibold underline">
              Learn More
            </span>
          </p>
          <div className="flex flex-col items-center mt-14 justify-center">
            <Button
              variant="outline"
              className="rounded-full  shadow-md text-gray-800 px-5 py-6 w-full"
            >
              Choose Files
            </Button>
            <p className="flex pt-5 pb-8 text-base border-b w-full justify-center text-gray-600 mb-6">
              Select any file type up to 1 GB
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Files in this product
            </h2>
            <div className="w-full h-60 bg-gray-100 rounded-lg flex flex-col justify-center items-center">
              {/* Parent div with flexbox to center content */}
              <div className="flex  justify-center items-center h-20 w-20 rounded-full bg-orange-400">
                <LuDownload className="size-8 text-white" />
              </div>{" "}
              <h2 className=" text-lg  mt-5 text-gray-600">
                Your files will appear here
              </h2>
            </div>
            <h2 className=" text-lg  mt-5 text-gray-600">
              <span className=" flex gap-2 text-2xl items-center text-black">
                <TbBulb />
                <span className=" flex gap-2 text-lg items-center font-bold  text-black">
                  Tip:{" "}
                  <span className="text-gray-600 font-medium">
                    You can add files and edit their names later.
                  </span>
                </span>
              </span>
            </h2>
          </div>
        </>
      )}

      {/* Step 3: Pricing */}
      {step === 3 && (
        <div className="">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Price Your Download
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Choose whether this download is paid or free. If it's paid, set its
            price and payment options. Don't worry, you can change this later!
          </p>
          <div className="flex mt-5 gap-10">
            <Button
              variant="outline"
              className={`px-24 py-10 shadow-md rounded-3xl ${
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
              className={`px-24  py-10 shadow-md rounded-3xl ${
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
        </div>
      )}
      <div className="flex justify-end mt-5 mb-10">
        <Button
          variant="outline"
          className="  py-2 rounded-full mr-auto text-sm font-medium "
          onClick={() => {
            handleBack(), scrollToTop();
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          className=" py-2 rounded-full text-sm font-medium "
          onClick={() => {
            handleNext(), scrollToTop();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LeftDownloadArea;
