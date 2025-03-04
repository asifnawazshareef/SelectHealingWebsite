import React, { useEffect, useState } from "react";
import LeftContentArea from "../Components/PodcastComponents/LeftContentArea";
import RightContentArea from "../Components/PodcastComponents/RightContentArea";
import { Progress } from "../ui/progress";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Mic } from "lucide-react";
import axios from "axios";
import utils from "../utils/utils";

const AddPodcast = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [author, setAuthor] = useState(""); // Selected author
  const [authorsList, setAuthorsList] = useState([]); // List of authors

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

  const [formData, setFormData] = useState({
    podcastName: "",
    podcastDescription: "",
    instructor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/podcastsListing");
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <>
      <div>
        <div className="flex items-center m-8 mb-3">
          <div className="bg-[#7254af] rounded-md mr-2 flex justify-center items-center">
            <Mic className="text-white m-3" size={18} />
          </div>
          <h2 className="text-xl font-bold">New Podcast</h2>
          <span className="ml-auto text-2xl ">
            <span className="cursor-pointer">
              <IoClose
                className="cursor-pointer"
                onClick={() => navigate("/podcastsListing")}
              />
            </span>
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2 rounded-none" />
      </div>

      <div className="flex flex-col xl:flex-row h-screen">
        <div className="flex-1 p-5 xl:p-10 basic-1/2 xl:basis-1/3">
          <LeftContentArea
            formData={formData}
            onInputChange={handleInputChange}
            step={step}
            handleNext={handleNext}
            handleBack={handleBack}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            author={author}
            setAuthor={setAuthor}
            authorsList={authorsList}
            setAuthorsList={setAuthorsList}
          />
        </div>
        <div className="flex-1 p-5 xl:p-10 basic-1/2 xl:basis-3/3">
          <RightContentArea
            data={formData}
            title={title}
            description={description}
            author={author}
          />
        </div>
      </div>
    </>
  );
};

export default AddPodcast;
