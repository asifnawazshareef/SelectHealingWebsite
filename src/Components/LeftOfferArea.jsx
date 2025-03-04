import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MdInvertColorsOff, MdOutlinePaid } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";
import { TbLetterKSmall } from "react-icons/tb";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FaApple, FaGooglePay } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { SiAfterpay, SiKlarna } from "react-icons/si";
import { cn } from "../lib/utils";
import { FaLock } from "react-icons/fa6";
import { ChevronDown, Trash2 } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IoWalletOutline } from "react-icons/io5";
import { Checkbox } from "../ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Input } from "../ui/input";
import { LuDownload } from "react-icons/lu";
const products = [
  {
    value: "exercise dissection workshop",
    label: "Select Healing: Exercise Dissection Workshop",
  },
  {
    value: "discussing the degenerative hip",
    label:
      "Select Healing: Discussing the Degenerative Hip-Signs, Symptoms, and Suggestions",
  },
  {
    value: "connect part 2",
    label: "Select Healing: Connect Part 2",
  },
  {
    value: "connect part 3",
    label: "Select Healing: Connect Part 3",
  },
  {
    value: "connect part (1-3)",
    label: "Select Healing: Connect (Parts 1-3)",
  },
];
const LeftOfferArea = ({
  formData,
  onInputChange,
  step,
  handleNext,
  handleBack,
}) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(true);
  const [isServiceAgreementOpen, setIsServiceAgreementOpen] = useState(true);

  const toggleCheckout = () => {
    setIsCheckoutOpen((prev) => !prev);
  };
  const toggleServiceAgreement = () => {
    setIsServiceAgreementOpen((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const handleProductSelect = (currentValue) => {
    if (!selectedProducts.find((p) => p.value === currentValue)) {
      const product = products.find((p) => p.value === currentValue);
      setSelectedProducts([...selectedProducts, product]);
    }
    setOpen(false);
  };
  const removeProduct = (valueToRemove) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.value !== valueToRemove)
    );
  };

  return (
    <div className="w-full flex-1 p-6  rounded-lg">
      {/* Step 1: Offer Details */}
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            What product(s) are you selling?
          </h2>
          <p className="text-sm font-normal text-gray-400 mb-6">
            Selling has never been easier. We'll help you price and sell your
            offer in a couple easy steps.
          </p>

          <form className="space-y-6">
            <div>
              <label
                className="block text-base font-medium text-gray-900 mb-1"
                htmlFor="offerName"
              >
                Offer Title
              </label>
              <input
                type="text"
                id="offerName"
                name="offerName"
                value={formData.offerName}
                onChange={onInputChange}
                className="w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(required)"
              />
            </div>

            <div>
              <label
                className="block text-base font-bold text-gray-900 mb-1"
                htmlFor="downloadDescription"
              >
                Product(s) in this offer
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full font-light text-gray-700 justify-between"
                  >
                    {value
                      ? products.find((product) => product.value === value)
                          ?.label
                      : "Select one or more products..."}
                    <ChevronsUpDown className="  opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search product..." />
                    <CommandList>
                      <CommandEmpty>No product found.</CommandEmpty>
                      <CommandGroup>
                        {products.map((product) => (
                          <CommandItem
                            key={product.value}
                            value={product.value}
                            onSelect={() => handleProductSelect(product.value)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProducts.some(
                                  (p) => p.value === product.value
                                )
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {product.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </form>
          {/* Selected Products Display */}
          <div className="mt-4 space-y-4">
            {selectedProducts.map((product) => (
              <div
                key={product.value}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-gray-700">{product.label}</p>
                  <p className="text-sm text-gray-500">{product.type}</p>
                </div>
                <button
                  onClick={() => removeProduct(product.value)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 2: Pricing */}
      {step === 2 && (
        <div className="">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Price Your Offer
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Choose how you would like to charge for this offer. If it's paid,
            set its price and payment preferences.
          </p>
          <div className="  lg:flex mt-5  justify-between">
            <Button
              variant="outline"
              className={`px-24 py-10 mx-5  md:mx-0  lg:px-20 xl:px-28 2xl:px-36 shadow-md rounded-3xl ${
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
              className={`px-24 mt-5 mx-5 lg:mt-0 md:mx-0  py-10 lg:px-20 xl:px-28 2xl:px-36 shadow-md rounded-3xl ${
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
              <div className="w-full md:flex justify-between items-center mt-8">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800">Price</h2>
                  <Input className="py-7 md:w-[160px] lg:w-[230px]  xl:w-[290px] 2xl:w-[350px] rounded-xl " />
                </div>

                <div className="flex flex-col ">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Currency
                  </h2>
                  <div className="">
                    <Select>
                      <SelectTrigger className=" md:w-[160px] lg:w-[230px]  xl:w-[290px] 2xl:w-[350px] p-7 rounded-xl ">
                        <SelectValue placeholder="USD"  />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="Dollar">Dollar</SelectItem>
                        <SelectItem value="Rupees">Rupees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="items-top flex mt-12 space-x-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Let customers pay what they want
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Customers can give any amount over the minimum price you
                    set.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mt-5 text-gray-800">
                Select Payment Providers
              </h2>
              <div className="">
                <Select >
                  <SelectTrigger className="w-full py-5 mt-3 mb-10">
                    <SelectValue placeholder="Select a Payment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">
                      Yearly
                    </SelectItem>
                    <SelectItem value="subscription">
                     Subscription
                    </SelectItem>
                    <SelectItem value="monthly">
                      Monthly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
           
          </div>
        </div>
      )}
 {/* Step 2: Pricing */}
 {step === 3 && (
        <div className="">
        <section className="">
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
         
        </section>
  
       
      </div> 
      )}

      <div className="flex justify-between gap-3 mt-5 mb-10">
        {step > 1 && (
          <Button
            variant="outline"
            className="py-2 rounded-full text-sm font-medium"
            onClick={() => {
              handleBack();
              scrollToTop();
            }}
          >
            Go Back
          </Button>
        )}
        <Button
          type="button"
          className="py-2 rounded-full w-full text-sm font-medium"
          onClick={() => {
            handleNext();
            scrollToTop();
          }}
        >
           {step === 3 ? "Save and Finish" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default LeftOfferArea;
