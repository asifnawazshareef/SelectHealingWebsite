// AddCourse.jsx
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import LeftOfferArea from "../Components/LeftOfferArea";

const NewOffer = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    offerName: "",
    offerDescription: "",
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
        <div className="flex pt-4 pb-3 px-5 ">
          <h2 className="text-xl font-bold    ">New Offer</h2>
          <span className="ml-auto text-2xl ">
            <span className="cursor-pointer">
              <IoClose
                className="cursor-pointer font-semibold"
                onClick={() => navigate("/courses")}
              />
            </span>
          </span>
        </div>
        <Progress
          value={progressPercentage}
          className="h-3 rounded-none [&>div]:bg-red-500"
        />
      </div>

      <div className="w-full">
        <div className="flex-none sm:flex w-full">
          <div className="w-full sm:w-[50%]">
            <LeftOfferArea
              formData={formData}
              onInputChange={handleInputChange}
              step={step}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOffer;
