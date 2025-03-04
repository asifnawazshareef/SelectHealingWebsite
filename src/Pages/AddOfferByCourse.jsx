import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "@/ui/button";
import img1 from "../assets/videoImg.png";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import utils from "../utils/utils";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { IoDocumentTextOutline, IoWalletOutline } from "react-icons/io5";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Card, CardContent } from "@/ui/card";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { PercentCircle } from "lucide-react";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddOfferByCourse = () => {
  // offer by price and percentage states

  const location = useLocation();
  const { lessonId } = location.state || {};
  const [selectedOffer, setSelectedOffer] = useState("percentage");
  const [totalPrice, setTotalPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [offerPercentage, setOfferPercentage] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [offerValueByPrice, setOfferValueByPrice] = useState("");
  const [offerValueByPercentage, setOfferValueByPercentage] = useState("");
  // Handlers for offer calculations
  const handleSelectChange = (value) => {
    setSelectedOffer(value);
    setCurrentPrice("");
    setOfferPercentage("");
  };
  const calculateOfferByPrice = () => {
    return currentPrice && totalPrice
      ? (totalPrice - currentPrice).toFixed(2)
      : "";
  };
  const calculateOfferByPercentage = () => {
    return offerPercentage && totalPrice
      ? (totalPrice - (totalPrice * offerPercentage) / 100).toFixed(2)
      : "";
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Update state for price-based offer
  useEffect(() => {
    setOfferValueByPrice(calculateOfferByPrice());
  }, [currentPrice, totalPrice]);

  // Update state for percentage-based offer
  useEffect(() => {
    setOfferValueByPercentage(calculateOfferByPercentage());
  }, [offerPercentage, totalPrice]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDateChange = (range) => {
    if (range.from && range.to) {
      setDateRange(range); // Set both start and end dates
    } else {
      setDateRange({
        startDate: range.from,
        endDate: null, // Clear end date if only start is selected
        key: "selection",
      });
    }
  };
  // Format the date to YYYY-MM-DD
  const formatDate = (date) => {
    return date ? date.toLocaleDateString("en-GB") : ""; // Format as DD/MM/YYYY
  };
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Details");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [offerData, setOfferData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offerId, setOfferId] = useState(id);
  const navigate = useNavigate();
  const tabs = [
    { name: "Details" },
    { name: "Pricing" },
    { name: "Upsells", count: 0 },
    { name: "Settings" },
  ];
  const handleAddContentClick = () => {
    setIsDialogOpen(true);
  };

  // Offer details fetch API
  useEffect(() => {
    fetchSinleOfferDetails();
  }, [id]);

  const fetchSinleOfferDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${utils.BASE_URL}offers?populate[course][populate]=media&filters[course][id]=${id}`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const offerData = response.data?.data?.[0];
      setTotalPrice(offerData?.attributes?.course?.data?.attributes?.price);
      console.log(offerData, "offerData");
      setOfferData(offerData);

      setError(null);
    } catch (error) {
      setError("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };

  // Add Offer API
  const handleAddOffer = async () => {
    try {
      const calculatedPrice = offerValueByPercentage || offerValueByPrice || 0; // Default to 0 if empty
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          course: id,
          price: parseFloat(calculatedPrice), // Ensure it's a number
          startDate: startDate || dateRange.startDate, // Default to selected range
          endDate: endDate || dateRange.endDate, // Default to selected range
        })
      );

      const response = await axios.post(`${utils.BASE_URL}offers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${utils.token}`,
        },
      });
      navigate(`/course-detail/${id}`);
      toast.success("Offer added successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error while adding offer:", error);
      toast.error("Failed to add offer. Please try again.");
    }
  };

  return (
    <>
      <section className="flex flex-col  ">
        <div className="flex gap-5 w-full">
          <div className="flex items-center">
            <img
              src={
                offerData?.attributes?.course?.data?.attributes?.media?.data
                  ?.attributes?.formats?.large?.url
                  ? `https://admin.selecthealing.online${offerData.attributes.course.data.attributes.media.data.attributes.formats.large.url}`
                  : `${img1}`
              }
              className="object-cover max-w-[150px] "
            />
          </div>

          <div className="border-b  border-gray-200 pb-5  flex flex-col  justify-between">
            <div className="flex gap-5 xl:gap-10 items-center">
              <h1 className=" text-xs  md:text-sm lg:text-base xl:text-lg font-semibold">
                {offerData?.attributes?.course?.data?.attributes?.title}
              </h1>

              <Button
                onClick={handleAddOffer}
                className="flex rounded-full py-6 px-6"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <Card className="mt-6 rounded-lg shadow-none border-none">
        {/* <OfferDetailsTab /> */}
        <section className="bg-[#F7F7F7] flex flex-col lg:flex-row  gap-7 pb-10">
          <div className="w-full flex flex-col gap-5">
            <Card className="w-full h-fit">
              <CardContent className="p-10 flex flex-col gap-5">
                <div className="text-xl mb-2 flex flex-col font-medium">
                  <h1>Offer Type:</h1>
                  <Select
                    defaultValue="percentage"
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full py-10 mt-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">
                        <div className="flex items-center space-x-2">
                          <span className="flex bg-blue-50 p-3 justify-center items-center rounded-md">
                            <PercentCircle className="text-blue-500 text-lg" />
                          </span>
                          <span className="block">Offer by Percentage</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="price">
                        <div className="flex items-center space-x-2">
                          <span className="flex bg-blue-50 p-3 justify-center items-center rounded-md">
                            <FaCircleDollarToSlot className="text-blue-500 text-lg" />
                          </span>
                          <span className="block">Offer by Price</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedOffer === "percentage" && (
                  <div>
                    <Input
                      placeholder="Enter offer percentage here.."
                      type="number"
                      value={offerPercentage}
                      onChange={(e) => setOfferPercentage(e.target.value)}
                      className="py-7 rounded-xl"
                    />
                  </div>
                )}

                {selectedOffer === "price" && (
                  <div>
                    <Input
                      placeholder="Enter current price here.."
                      type="number"
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                      className="py-7 rounded-xl"
                    />
                  </div>
                )}

                <hr />
                <div className="mb-2 flex justify-between gap-3 font-medium">
                  <div className=" mb-2 flex flex-col gap-5 ">
                    <h1 className="text-xl font-medium">Offer Time Period:</h1>
                    <div className="flex flex-col items-center p-6">
                      <div className="flex gap-6">
                        {/* Start Date */}
                        <div className="relative w-full max-w-[300px]">
                          <label
                            htmlFor="startDate"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            Start Date
                          </label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()}
                            placeholderText="Select start date"
                            showDateSelect
                            className="py-3 px-4 w-full rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                          />
                        </div>

                        {/* End Date */}
                        <div className="relative w-full max-w-[300px]">
                          <label
                            htmlFor="endDate"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                          >
                            End Date
                          </label>
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()}
                            placeholderText="Select end date"
                            showDateSelect
                            className="py-3 px-4 w-full rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex flex-col items-center p-6">
                      <div className="flex gap-4">
                        <div className="relative">
                          <label
                            htmlFor="startDate"
                            className="block font-semibold"
                          >
                            Start Date
                          </label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select start date"
                            className="py-2 px-3 rounded-lg border border-gray-300"
                          />
                        </div>

                        <div className="relative">
                          <label
                            htmlFor="endDate"
                            className="block font-semibold"
                          >
                            End Date
                          </label>
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate} // Disable dates before the start date
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select end date"
                            className="py-2 px-3 rounded-lg border border-gray-300"
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="2xl:basis-1/3 lg:basis-1/2 shadow-none flex flex-col gap-7 font-semibold text-lg">
            {/* Offer Pricing Card */}
            <div className="border rounded-lg flex gap-3 flex-col bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Offer Status</h3>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <div className="px-3 py-1 bg-[#f0f0f0] text-[#2a2928] flex gap-1 font-medium text-2xl items-center rounded-full justify-center">
                    <IoDocumentTextOutline />
                    <Label htmlFor="r1" className="font-medium">
                      Draft
                    </Label>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  {/* <Label htmlFor="r2">Published</Label> */}
                  <div className="px-3 py-1 bg-[#d2f8df] text-[#085a35] flex gap-1 font-medium text-2xl items-center rounded-full justify-center">
                    <IoDocumentTextOutline />
                    <Label htmlFor="r1" className="font-medium">
                      Published
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            <div className="border rounded-lg bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Offer Pricing</h3>
              {/* offer by price */}

              {/* offer by percentage */}
              {selectedOffer === "percentage" ? (
                <div>
                  {calculateOfferByPercentage() ? (
                    <p className="text-xl font-bold text-[#333231]">
                      ${calculateOfferByPercentage()}
                    </p>
                  ) : (
                    <p className="text-xl font-bold text-[#333231]">
                      ${offerData?.attributes?.course?.data?.attributes?.price}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {calculateOfferByPrice() ? (
                    <p className="text-xl font-bold text-[#333231]">
                      ${calculateOfferByPrice()}
                    </p>
                  ) : (
                    <p className="text-xl font-bold text-[#333231]">
                      ${offerData?.attributes?.course?.data?.attributes?.price}
                    </p>
                  )}
                </div>
              )}

              <span className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-full inline-block mt-2">
                {`${formatDate(startDate)} - ${formatDate(endDate)}`}
              </span>
            </div>
          </div>
        </section>
      </Card>
    </>
  );
};

export default AddOfferByCourse;
