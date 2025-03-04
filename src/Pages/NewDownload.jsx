// AddCourse.jsx
import React, { useEffect, useState } from "react";
import LeftContentArea from "../Components/LeftContentArea";
import RightContentArea from "../Components/RightContentArea";
import { Progress } from "../ui/progress";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import RightDownloadArea from "../Components/RightDownloadArea";
import LeftDownloadArea from "../Components/LeftDownloadArea";

const AddCourse = () => {
 
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    downloadName: "",
    downloadDescription: "",
 
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
      navigate("/add-download");
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div>
      <div className="mb-7">
        <div className="flex m-8 mb-3">
          <h2 className="text-2xl font-bold   ">New Download</h2>
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

      <div className="w-full">
  <div className="flex w-full">
    <div className="w-full">
      <LeftDownloadArea
        formData={formData}
        onInputChange={handleInputChange}
        step={step}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
    <div className="w-2/3">
      <RightDownloadArea data={formData} />
    </div>
  </div>
</div>

    </div>
  );
};

export default AddCourse;
