import { useState, useEffect } from "react";
import axios from "axios";
import utils from "../utils/utils";
import { Textarea } from "@/ui/textarea";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { ChevronDown, Circle, Trash2, ExternalLink } from "lucide-react";
import { Switch } from "@/ui/switch";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { TabsContent } from "@/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";

const PostTabsContent = () => {
  const navigate = useNavigate();
  
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [socialImage, setSocialImage] = useState(null);
  const [socialPreview, setSocialPreview] = useState(null);
  const [title, settitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState(""); // Selected author
  const [authorsList, setAuthorsList] = useState(null); // List of authors

  // Fetch authors list from API or predefined list
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${utils.BASE_URL}authors`, {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        });
        if (response.status === 200) {
          setAuthorsList(response?.data?.data);
          console.log(response?.data?.data, "auther response");
        } else {
          toast.error("Failed to fetch authors.");
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
        toast.error("Error fetching authors. Please try again.");
      }
    };

    fetchAuthors();
  }, []);

  const handleThumbnailImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnailImage(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSocialImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSocialImage(file);
      setSocialPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveModule = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title,
          author,
          url,
          description,
        })
      );
      // formData.append("files.authorPicture", socialImage);
      formData.append("files.media", thumbnailImage);

      const response = await axios.post(`${utils.BASE_URL}news`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${utils.token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Newsletter saved successfully!");
        navigate("/newsletters");
      } else {
        toast.error("Failed to save newsletter.");
      }
    } catch (error) {
      console.error("Error saving newsletter:", error);
      toast.error("Failed to add module. Please try again.");
    }
  };

  return (
    <TabsContent className="" value="post">
      <Card>
        <CardContent className="space-y-2 p-5">
          <section className="mb-6">
            <Label className="block text-xl text-[#2a2928] font-semibold">
              Post thumbnail
            </Label>
            <div className="border rounded-lg p-6 flex lg:flex-row flex-col items-center gap-10">
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Selected Thumbnail"
                  className="w-[35%] h-36 object-cover rounded"
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
                <Label className="bg-white rounded-full hover:bg-gray-100 font-medium text-gray-700 py-2 px-6 shadow-md border-gray-200 border-[1px] cursor-pointer">
                  <h2 className="flex items-center justify-center gap-3">
                    <span> Choose thumbnail</span>
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
          {/* <div className="space-y-1 pb-3">
            <Label htmlFor="current">Tags</Label>
            <Input id="current" placeholder="Tag List" type="settings" />
            <h3 className="text-sm text-gray-500">
              Add a tag by typing the name and hitting the ENTER/ TAB key.
            </h3>
          </div> */}
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">Authors</Label>
            <Select onValueChange={(value) => setAuthor(value)} defaultValue="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an author" value={author} />
              </SelectTrigger>
              <SelectContent>
                {authorsList?.map((authorItem) => (
                  <SelectItem
                    key={authorItem.id}
                    value={authorItem.id}
                  >
                    {authorItem?.attributes?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <h3 className="text-sm text-gray-500">
              Add an author by typing the name and hitting the ENTER/TAB key.
            </h3>
          </div>
        </CardContent>
        {/* SEO and sharing */}
        <CardContent className="space-y-2 p-5">
          <Label className="block text-xl text-[#2a2928] font-semibold">
            SEO and sharing
          </Label>
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">URL slug</Label>
            <Input
              id="current"
              placeholder="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              type="settings"
            />
            <h3 className="text-sm text-gray-500">
              https://www.selecthealing.com/newsletters/select-healing-
              newsletter/posts/108472
            </h3>
          </div>
          <div className="space-y-1 pb-3">
            <Label htmlFor="current">Page title</Label>
            <Input
              id="current"
              placeholder="Page Title"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              type="settings"
            />
            <h3 className="text-sm text-gray-500">
              Give the Page a clear and accurate tme in 60 characters or less.
            </h3>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2">Page description</Label>
            <Textarea
              placeholder="Page Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="message-2"
              rows="6"
            />
            <p className="text-sm text-muted-foreground">
              Describe the Page's content in 160 characters 0' less.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button className="text-red-500 p-0" variant="link">
            <Trash2 /> Delete Post
          </Button>
          <Button className="rounded-full" onClick={handleSaveModule}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default PostTabsContent;
