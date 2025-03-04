import { useState } from "react";
import { Textarea } from "@/ui/textarea";
import { Button } from "../ui/button";
import { ChevronDown, Circle, Trash2, ExternalLink } from "lucide-react";
import { Switch } from "@/ui/switch";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { TabsContent } from "@/ui/tabs";
const SettingsTabsContent = () => {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [socialImage, setSocialImage] = useState(null);

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
  const handleSocialImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSocialImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <TabsContent className="" value="settings">
      <Card>
        <CardContent className="space-y-2 p-5">
          <section className="mb-6">
            <Label className="block text-xl text-[#2a2928] font-semibold">
              Post thumbnail
            </Label>
            <div className="border rounded-lg p-6 flex lg:flex-row flex-col items-center gap-10">
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
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">Tags</Label>
            <Input id="current" placeholder="Tag List" type="settings" />
            <h3 className="text-sm text-gray-500">
              Add a tag by typing the name and hitting the ENTER/ TAB key.
            </h3>
          </div>
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">Authors</Label>
            <Input id="current" placeholder="Authors List" type="settings" />
            <h3 className="text-sm text-gray-500">
              Add an author by typing the name and hitting the ENTER/TAB key.
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <div>
              <Label htmlFor="airplane-mode">Hide from web</Label>
              <h3 className="text-sm text-gray-500">
                This removes the post from your publicly visible newsletter
                feed,
              </h3>
            </div>
          </div>
        </CardContent>
        {/* SEO and sharing */}
        <CardContent className="space-y-2 p-5">
          <Label className="block text-xl text-[#2a2928] font-semibold">
            SEO and sharing
          </Label>
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">URL slug</Label>
            <Input id="current" placeholder="" type="settings" />
            <h3 className="text-sm text-gray-500">
              https://www.selecthealing.com/newsletters/select-healing-
              newsletter/posts/108472
            </h3>
          </div>
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">Page title</Label>
            <Input id="current" placeholder="Page Title" type="settings" />
            <h3 className="text-sm text-gray-500">
              Give the Page a clear and accurate tme in 60 characters or less.
            </h3>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2">Page description</Label>
            <Textarea placeholder="Page Description" id="message-2" />
            <p className="text-sm text-muted-foreground">
              Describe the Page's content in 160 characters 0' less.
            </p>
          </div>
          <section className="py-5">
            <div className="border rounded-lg  p-6 flex  lg:flex-col flex-col gap-10">
              <div className="flex justify-center">
                {socialImage ? (
                  <img
                    src={socialImage}
                    alt="Selected Thumbnail"
                    className="w-32 h-32 object-cover rounded "
                  />
                ) : (
                  <div className="w-[35%] h-36 bg-gray-200 rounded-md flex items-center  justify-center">
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
              </div>
              <div className="flex flex-col  gap-10">
                <p className="text-base font-medium text-gray-500 ">
                  Recommended dimensions of
                  <strong> 1280×720</strong>
                </p>
                <Label className="bg-white rounded-full max-w-fit hover:bg-gray-100 font-medium text-gray-700 py-2 px-6 shadow-md border-gray-200 border-[1px] cursor-pointer">
                  <h2 className="flex items-center justify-center gap-3">
                    <span>Choose a social image</span>
                    <ChevronDown className="size-7" />
                  </h2>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleSocialImage}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
          </section>
        </CardContent>
        <CardContent className="space-y-1 flex flex-col gap-3">
          <Label className="block text-xl text-[#2a2928] font-semibold mb-3">
            Post comments
          </Label>
          <RadioGroup defaultValue="visible" className="flex flex-col gap-5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visible" id="r1" />
              <Label htmlFor="r1">Visible</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hidden" id="r2" />
              <Label htmlFor="r2">Hidden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="locked" id="r3" />
              <Label htmlFor="r3">Locked</Label>
            </div>
          </RadioGroup>
          <Button className="p-0 max-w-fit" variant="link">
            Comment settings
            <ExternalLink />
          </Button>
        </CardContent>
        {/* Email settings */}
        <CardContent className="space-y-2 p-5">
          <Label className="block text-xl text-[#2a2928] font-semibold">
            Email settings
          </Label>
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">Email subject</Label>
            <Input
              id="current"
              placeholder="Override email subject title..."
              type="settings"
            />
          </div>
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">preview text</Label>
            <Input
              id="current"
              placeholder="Override email preview text..."
              type="settings"
            />
          </div>
        </CardContent>
        <CardContent className="space-y-1 flex flex-col gap-3">
          <Label className="block text-xl text-[#2a2928] font-semibold mb-3">
            Audience
          </Label>
          <RadioGroup defaultValue="visible" className="flex flex-col gap-5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visible" id="a1" />
              <Label htmlFor="a1">All subscribers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="A segment of your subscribers" id="a2" />
              <Label htmlFor="a2">A segment of your subscribers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Only free subscribers" id="a3" />
              <Label htmlFor="a3">Only free subscribers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Only paid subscribers" id="a4" />
              <Label htmlFor="a4">Only paid subscribers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="a5" />
              <Label htmlFor="a5">None</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button className="text-red-500 p-0" variant="link">
            <Trash2 /> Delete Post
          </Button>
          <Button className="rounded-full">Save</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default SettingsTabsContent;
