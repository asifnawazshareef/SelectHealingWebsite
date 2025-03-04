import React, { useEffect, useState } from "react";
import LeftContentArea from "../Components/CommunityComponents/LeftContentArea";
// import RightContentArea from "../Components/CommunityComponents/RightContentArea";
import { Progress } from "../ui/progress";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from "axios";
import utils from "../utils/utils";
import { MessageCircle } from "lucide-react";
const AddCommunity = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState(""); // Selected author
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [previewSelectedImage, setPreviewSelectedImage] = useState(null);
  const [errors, setErrors] = useState({
    title: '',
    caption: '',
    course: '',
    day: '',
    time: '',
    image: '',
  });
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday", // Ensure Thursday is included here
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Fetch courses list from API or predefined list
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${utils.BASE_URL}courses?populate=*`, {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        });
        if (response.status === 200) {
          setCourses(response?.data?.data);
          console.log(response?.data?.data, "courses response");
        } else {
          toast.error("Failed to fetch authors.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses. Please try again.");
      }
    };

    fetchCourses();
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

  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!title) {
      newErrors.title = "Title is required";
      valid = false;
    } else {
      newErrors.title = '';
    }

    if (!caption) {
      newErrors.caption = "Caption is required";
      valid = false;
    } else {
      newErrors.caption = '';
    }

    setErrors(newErrors);
    return valid;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    let valid = true;
    const newErrors = { ...errors };
  
    // Validate course selection
    if (!selectedCourseId) {
      newErrors.course = "Please select a course.";
      valid = false;
    } else {
      newErrors.course = '';
    }
  
    // Separate validation for day and time
    if (!selectedDay) {
      newErrors.day = "Please select a day.";
      valid = false;
    } else {
      newErrors.day = '';
    }
  
    if (!selectedTime) {
      newErrors.time = "Please select a time.";
      valid = false;
    } else {
      newErrors.time = '';
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  // Step 3 Validation
  const validateStep3 = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!previewSelectedImage) {
      newErrors.image = "Please upload an image.";
      valid = false;
    } else {
      newErrors.image = '';
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle Next Step
  const handleNext = () => {
    let isValid = true;
    
    if (step === 1) isValid = validateStep1();
    if (step === 2) isValid = validateStep2();
    if (step === 3) isValid = validateStep3();

    if (isValid && step < 3) setStep(step + 1);
  };

  // Handle Back Step
  const handleBack = () => {
    if (step === 1) {
      navigate("/community");
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <>
      <div>
        <div className="flex items-center m-8 mb-3">
          <div className="  bg-[#60cdb6] text-white py-3 rounded-md px-3 mr-2 flex justify-center items-center">
            <MessageCircle className="-rotate-90" size={18} />
          </div>
          <h2 className="text-xl font-bold">New Community</h2>
          <span className="ml-auto text-2xl ">
            <span className="cursor-pointer">
              <IoClose
                className="cursor-pointer"
                onClick={() => navigate("/community")}
              />
            </span>
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2 rounded-none" />
      </div>

      <div className="flex flex-col xl:flex-row h-screen max-w-5xl mx-auto">
        <div className="flex-1 p-5 xl:p-10">
          <LeftContentArea
           title={title}
           setTitle={setTitle}
           caption={caption}
           setCaption={setCaption}
           selectedCourseId={selectedCourseId}
           setSelectedCourseId={setSelectedCourseId}
           selectedDay={selectedDay}
           setSelectedDay={setSelectedDay}
           selectedTime={selectedTime}
           setSelectedTime={setSelectedTime}
           previewSelectedImage={previewSelectedImage}
           setPreviewSelectedImage={setPreviewSelectedImage}
           errors={errors}
           validateStep1={validateStep1}
           validateStep2={validateStep2}
           validateStep3={validateStep3}
           step={step}
           handleNext={handleNext}
           handleBack={handleBack}
           courses={courses}
           daysOfWeek={daysOfWeek}
          />
        </div>
      </div>
    </>
  );
};

export default AddCommunity;
