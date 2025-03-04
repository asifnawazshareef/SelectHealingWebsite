import { useState } from "react";
import { FaLock } from "react-icons/fa6";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/card";
import { Textarea } from "@/ui/textarea";
import { ChevronDown, Trash2 } from "lucide-react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { Button } from "@/ui/button";
const CreateOffer = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(true);
  const [isServiceAgreementOpen, setIsServiceAgreementOpen] = useState(true);
  const toggleCheckout = () => {
    setIsCheckoutOpen((prev) => !prev);
  };
  const toggleServiceAgreement = () => {
    setIsServiceAgreementOpen((prev) => !prev);
  };
  return (
    <div className="flex justify-between md:flex-row md:items-start items-center flex-col-reverse gap-10 p-5">
      <section className="max-w-[70%]">
        <div className="flex flex-col text-[#343332] gap-2 mb-6">
          <h2 className="text-2xl font-semibold">Customize your checkout</h2>
          <p className="text-base">
            Apply your brand and decide what information to collect during the
            checkout experience.
          </p>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="bg-color"
            className="font-medium text-lg text-[#191919]"
          >
            Button background color
          </Label>
          <div className="flex gap-5 items-center">
            <div class="min-w-14 min-h-14 bg-[#343332] rounded-full border-gray-300 border-[4px]"></div>
            <Input type="text" placeholder="Background color" />
          </div>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="bg-color"
            className="font-medium text-lg text-[#191919]"
          >
            Button text
          </Label>
          <Input type="text" placeholder="Complete my purchase" />
        </div>
        <div>
          <Button variant="link" onClick={toggleCheckout}>
            <ChevronDown /> Checkout fields
          </Button>
        </div>
        {isCheckoutOpen && (
          <Card className="mb-4 p-6">
            <div className="grid gap-5 grid-cols-2">
              <div className="flex items-center gap-3">
                <Switch />
                <Label htmlFor="bg-color">Address</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch />
                <Label htmlFor="bg-color">Phone Number</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch />
                <Label htmlFor="bg-color">Name</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch />
                <Label htmlFor="bg-color">Tax ID</Label>
              </div>
            </div>
          </Card>
        )}
        <div>
          <Button variant="link" onClick={toggleServiceAgreement}>
            <ChevronDown /> Service agreement
          </Button>
          {isServiceAgreementOpen && (
            <Card className="mb-4 p-6">
              <CardDescription className="mb-3">
                Allow customers to consent to the Terms and Conditions policy
                for your business.
                <Button
                  className="underline px-1 text-gray-600 hover:text-gray-800"
                  variant="link"
                >
                  Learn more
                </Button>
              </CardDescription>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Not required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Default text</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Custom text</Label>
                </div>
              </RadioGroup>
            </Card>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-5 mb-10">
          <Button
            variant="outline"
            className="  py-2 rounded-full mr-auto text-sm font-medium "
            onClick={() => {
              handleBack(), scrollToTop();
            }}
          >
            Go Back
          </Button>
          <Button
            type="button"
            className="w-full py-2 rounded-full text-sm font-medium "
            onClick={() => {
              handleNext(), scrollToTop();
            }}
          >
            Save and Finish
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CreateOffer;
