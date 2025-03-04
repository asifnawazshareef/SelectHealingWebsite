import { useEffect, useState } from "react";
import { Textarea } from "@/ui/textarea";
import { ChevronDown, Trash2 } from "lucide-react";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import img1 from "../assets/videoImg.png";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { IoDocumentTextOutline, IoWalletOutline } from "react-icons/io5";
import { BiLinkAlt } from "react-icons/bi";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { IoBanOutline } from "react-icons/io5";
import { Checkbox } from "@/ui/checkbox";
import { FiAlertCircle } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Card, CardContent } from "@/ui/card";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file

const OfferDetailsTab = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange({ ...dateRange, startDate, endDate });
  };

  // for form data
  const methods = useForm({
    defaultValues: {
      marketing_emails: false,
      security_emails: true,
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <>
      <section className="bg-[#F7F7F7] flex flex-col lg:flex-row  gap-7 pb-10">
        <div className="w-full flex flex-col gap-5">
          {/* new */}
          <Card className="w-full h-fit">
            <CardContent className="p-10 flex flex-col gap-5">
              <div className="text-xl mb-2 flex flex-col font-medium">
                <h1>Offer Price:</h1>
                <Select defaultValue="one-time">
                  <SelectTrigger className="w-full py-10 mt-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">
                      <div className="flex items-center space-x-2">
                        <span className="flex  bg-blue-50 p-3 justify-center items-center rounded-md">
                          <IoWalletOutline className="text-blue-500 text-lg" />
                        </span>
                        <span className=" block">Offer by Percentaget</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="subscription">
                      <div className="flex items-center space-x-2">
                        <span className="flex  bg-blue-50 p-3 justify-center items-center rounded-md">
                          <IoWalletOutline className="text-blue-500 text-lg" />
                        </span>
                        <span className=" block">Offer by Price</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Enter offer price here.."
                type="number"
                className="py-7 rounded-xl"
              ></Input>
              <hr />
              <div className=" mb-2  flex justify-between gap-3 font-medium">
                <div className="text-xl mb-2 flex flex-col gap-5 font-medium">
                  <h1>Offer Time period:</h1>
                  <DateRangePicker
                    ranges={[dateRange]}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    showSelectionPreview={true}
                    className="border rounded-md"
                  />
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
            <p className="text-xl font-bold text-[#333231]">$99.00 USD</p>
            <span className="text-sm bg-gray-200 text-gray-700 py-1 px-3 rounded-full inline-block mt-2">
              Unlimited
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferDetailsTab;
