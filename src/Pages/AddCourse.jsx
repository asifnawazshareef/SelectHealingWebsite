// AddCourse.jsx
import React, { useEffect, useState } from "react";
import LeftContentArea from "../Components/LeftContentArea";
import RightContentArea from "../Components/RightContentArea";
import { Progress } from "../ui/progress";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";

const AddCourse = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const totalSteps = 2;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
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
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/courses");
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <>
      <div>
        <div className="flex m-8 mb-3">
          <h2 className="text-2xl font-bold   ">New Course</h2>
          <span className="ml-auto text-2xl ">
            <span className="cursor-pointer">
              <IoClose
                className="cursor-pointer"
                onClick={() => navigate("/courses")}
              />
            </span>
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3 rounded-none" />
      </div>

      <div className="flex h-screen">
        <div className="flex-none lg:flex w-full">
          <div className="w-full lg:w-[50%]">
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
              category={category}
              setCategory={setCategory}
            />
          </div>

          <div className="px-8  w-full lg:w-[50%]">
            <RightContentArea
              data={formData}
              title={title}
              description={description}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
