import { useState } from "react";
import { Textarea } from "@/ui/textarea";
import { ChevronDown, Trash2 } from "lucide-react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/card";
import { Switch } from "@/ui/switch";
import axios from "axios";
import utils from "../../utils/utils";
import { Button } from "@/ui/button";
import { toast } from "react-toastify";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Checkbox } from "@/ui/checkbox";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { CardHeader } from "../../ui/card";
const PodcastSettingsTab = ({
  podcastTitle,
  podcastDescription,
  podcastAuthor,
  id,
  podcastThumbnail,
}) => {
  const Navigate = useNavigate();
  const [thumbnailImage, setThumbnailImage] = useState(podcastThumbnail);
  const [previewThumbnailImage, setPreviewThumbnailImage] = useState(null);
  const [description, setDescription] = useState(podcastDescription);
  const [author, setAuthor] = useState(podcastAuthor);
  const [title, setTitle] = useState(podcastTitle);

  const handleThumbnailImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewThumbnailImage(reader.result); // Update preview image
      };
      reader.readAsDataURL(file);
      setThumbnailImage(file); // Store file for API submission
    }
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
  // Edit Podcast API
  const handleEditPodcast = async () => {
    try {
      const formData = new FormData();
      console.log(id);
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          author: author,
          description: description,
        })
      );

      if (thumbnailImage) {
        formData.append("files.thumbnail", thumbnailImage);
        formData.append("files.video", thumbnailImage);
        formData.append("files.media", thumbnailImage);
      }

      const response = await axios.put(
        `${utils.BASE_URL}podcasts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Podcast updated successfully!");
        Navigate("/podcastsListing");
      }
    } catch (error) {
      toast.error("Failed to update podcast. Please try again.", error);
    }
  };

  return (
    <>
      <section className="bg-[#F7F7F7] flex flex-col lg:flex-row  gap-7 pb-10">
        <div className="2xl:basis-1/3 lg:basis-1/2 shadow-none flex  flex-col gap-7 font-semibold  text-lg">
          <h2 className="text-xl font-medium ">Details</h2>
          <p className="text-gray-600 text-base font-normal">
            Give your podcast a title, description, and thumbnail image. This
            details will appear on your Podcast page and listening apps.
          </p>
        </div>
        <Card className="w-full max-w-[65%]">
          <CardContent className="p-10">
            <div className="mb-6">
              <div className="space-y-1 pb-3">
                <Label htmlFor="current">Podcast Title</Label>
                <Input
                  id="title"
                  placeholder="Podcast Title"
                  type="settings"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span className="text-gray-400 text-xs font-medium">
                  Updating tile will alsi update the podcast URL
                </span>
              </div>
              <div className="space-y-1 pb-3">
                <Label htmlFor="current">Hosted By</Label>
                <Input
                  id="hosted"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Hosted By"
                  type="settings"
                />
              </div>
              <div className="space-y-1 pb-3">
                <Label htmlFor="current">Owner Email</Label>
                <Input
                  id="current"
                  placeholder="projelead@innovativemojo.com"
                  type="email"
                />
                <span className="text-gray-400 text-xs font-medium">
                  This email address is used to verify ownership os your
                  podcast. This can be seen on your public RSS feed.
                </span>
              </div>
              <div className="space-y-1 pb-3">
                <Label htmlFor="current">Copyright</Label>
                <Input id="current" placeholder="Copyright" type="settings" />
              </div>

              <div className="grid w-full gap-1.5 pb-3">
                <Label htmlFor="message-2">Description</Label>
                <Textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="message-2"
                  rows="5"
                />
              </div>

              <div className="grid w-full gap-1.5 pb-3">
                <Label htmlFor="message-2">Language</Label>
                <div>
                  <Select defaultValue="english">
                    <SelectTrigger className="w-full py-2 mt-1">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full gap-1.5 pb-3">
                <Label htmlFor="message-2">Category *</Label>
                <div>
                  <Select defaultValue="-- Please Select Category --">
                    <SelectTrigger className="w-full py-2 mt-1">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-- Please Select Category --">
                        -- Please Select Category --
                      </SelectItem>
                      <SelectItem value="Art/Food">Comedy</SelectItem>
                      <SelectItem value="other">Thriller</SelectItem>
                      <SelectItem value="other">Action</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pb-3">
                <div className="border w-fit rounded-lg p-6 flex flex-col gap-10">
                  {previewThumbnailImage ? (
                    <img
                      src={previewThumbnailImage}
                      alt="Selected Thumbnail"
                      className="w-32 h-32 object-cover rounded"
                    />
                  ) : thumbnailImage ? (
                    <img
                      src={`${utils.BASE_URL_MEDIA}${thumbnailImage}`}
                      alt="Thumbnail"
                      className="w-32 h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-36 bg-gray-200 rounded-md ">
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
                  <div className="flex flex-col gap-10 ">
                    <p className="text-base font-medium text-gray-500 ">
                      Recommended dimensions of
                      <strong> 3000x3000</strong>
                    </p>
                    <Label className="bg-white rounded-full hover:bg-gray-100 font-medium text-gray-700 py-2 px-6 shadow-md border-gray-200 border-[1px] cursor-pointer">
                      <h2 className="flex items-center justify-center gap-3">
                        <span> Replace thumbnail</span>{" "}
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
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="bg-[#f8f8f8] py-5">
        <CardFooter className="flex justify-between items-center">
          <Button className="text-red-500 p-0" variant="link">
            <Trash2 /> Delete Podcast
          </Button>
          <Button className="rounded-full" onClick={handleEditPodcast}>
            Save
          </Button>
        </CardFooter>
      </section>
    </>
  );
};

export default PodcastSettingsTab;
