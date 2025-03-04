import img1 from "../assets/videoImg.png";
import { Link, useNavigate } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import utils from "../utils/utils";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
const Offers = () => {
  const navigate = useNavigate();
  const [offerData, setOfferData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOfferCourses();
  }, []);

  const fetchOfferCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${utils.BASE_URL}offers?populate[course][populate]=media`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const offerData = response?.data?.data;
      setOfferData(offerData);

      setError(null);
    } catch (error) {
      setError("Failed to fetch course details.");
    } finally {
      setLoading(false);
    }
  };
  // Remove Offer API
  const handleDeleteOffer = async (id) => {
    const url = `${utils.BASE_URL}offers/${id}`;
    console.log("Sending DELETE request to:", url);

    // Show loading toast
    const toastId = toast.loading("Deleting offer...");

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });

      if (response.status === 200) {
        console.log("Offer deleted successfully:", response.data);
        toast.update(toastId, {
          render: "Offer deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        fetchOfferCourses();
      } else {
        console.error("Unexpected response status:", response.status);
        toast.update(toastId, {
          render: "Failed to delete offer.",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error deleting offer:", error.message);
      if (error.response) {
        console.log("Error details:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Offers</h1>
        <Button
          onClick={() => navigate("/add-offer")}
          className="bg-black text-white px-5 py-5 rounded-full"
        >
          <FaPlus />
          New Offer
        </Button>
      </div>

      <div className="p-10 bg-white  rounded-2xl  shadow-lg border border-gray-300">
        <div className="mb-5 flex justify-between items-center border-gray-200">
          <h2 className="text-lg font-semibold">
            {offerData?.length}{" "}
            <span className="text-base font-normal">Offers</span>
          </h2>
        </div>

        {/* Offer Cards */}
        {offerData?.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col md:flex-row items-center gap-4 mb-4 animate-fadeIn"
          >
            <img
              src={`https://admin.selecthealing.online${offer?.attributes?.course?.data?.attributes?.media?.data?.attributes?.url}`}
              alt="Offer Thumbnail"
              className="w-32 h-20 rounded-lg object-cover shadow-md"
            />

            <div className="flex-1">
              <Link
                to={`/offer-details/${offer.id}`}
                className="text-lg font-medium hover:text-purple-700 text-gray-800 mb-2"
              >
                {offer?.attributes?.course?.data?.attributes?.title}
              </Link>
              <div className="flex gap-3 items-center">
                <IoPricetagOutline />
                <del className="text-gray-400 font-semibold">
                  ${offer?.attributes?.course?.data?.attributes?.price} USD
                </del>
                <p className="text-gray-600 font-semibold">
                  ${offer?.attributes?.price} USD
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-500 hover:text-black">
                <HiDotsHorizontal className="" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-300 rounded-md shadow-lg w-40">
                <Link to={`/offer-details/${offer.id}`}>
                  {" "}
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => handleDeleteOffer(offer.id)}>
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
                              onChange={(e) => setDescription(e.target.value)}
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
    </>
  );
};

export default Offers;
