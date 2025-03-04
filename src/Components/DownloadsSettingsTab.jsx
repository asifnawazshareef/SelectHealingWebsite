import { useState } from "react";
import { Textarea } from "@/ui/textarea";
import { ChevronDown } from "lucide-react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Card, CardContent } from "@/ui/card";
const DownloadsSettingsTab = () => {
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const handleThumbnailImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-[#F7F7F7] flex flex-col lg:flex-row  gap-7">
      <section className="2xl:basis-1/3 lg:basis-1/2 shadow-none flex  flex-col gap-7 font-semibold  text-lg">
        <h2 className="text-xl font-medium ">Details</h2>
        <p className="text-gray-600 text-base font-normal">
          Give your download a title, description, and thumbnail image that will
          appear on your product's checkout page.
        </p>
      </section>
      <Card className="w-full">
        <CardContent className="p-10">
          <section className="mb-6">
            <div className="space-y-1 pb-3">
              <Label htmlFor="current">Title</Label>
              <Input id="current" placeholder="Title" type="settings" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message-2">Description</Label>
              <Textarea placeholder="Description" id="message-2" />
            </div>
            <div className="border rounded-lg p-6 mt-7 flex lg:flex-row flex-col items-center gap-10">
              {thumbnailImage ? (
                <img
                  src={thumbnailImage}
                  alt="Selected Thumbnail"
                  className="w-32 h-32 object-cover rounded"
                />
              ) : (
                <div className="w-[35%] h-36 bg-gray-200 rounded-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-[#bbbab9]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <path d="M21 15l-5-5L5 21"></path>
                  </svg>
                </div>
              )}
              <div className="flex flex-col gap-10 items-center">
                <p className="text-base font-medium text-gray-500 ">
                  Recommended dimensions of
                  <strong> 1280×720</strong>
                </p>
                <Label className="bg-white rounded-full hover:bg-gray-100 font-medium text-gray-700 py-2 px-6 shadow-md border-gray-200 border-[1px] cursor-pointer">
                  <h2 className="flex items-center justify-center gap-3">
                    <span> Choose thumbnail</span>{" "}
                    <ChevronDown className="size-7" />
                  </h2>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailImage}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadsSettingsTab;
