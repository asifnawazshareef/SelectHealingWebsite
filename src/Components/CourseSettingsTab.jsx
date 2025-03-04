import { useEffect, useState, useRef } from "react";
import { Textarea } from "@/ui/textarea";
import { ChevronDown, Trash2 } from "lucide-react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import axios from "axios";
import utils from "../utils/utils";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "@/ui/switch";
import { Button } from "@/ui/button";
import { toast } from "react-toastify";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Checkbox } from "@/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/ui/form";
const CourseSettingsTab = ({
  courseTitle,
  courseDescription,
  courseMedia,
  courseId,
  courseCategory,
  coursePrice,
}) => {
  const navigate = useNavigate();
  const [thumbnailImage, setThumbnailImage] = useState(courseMedia);
  const [previewThumbnailImage, setPreviewThumbnailImage] = useState(null);
  const [title, setTitle] = useState(courseTitle);
  const [description, setDescription] = useState(courseDescription);
  const [price, setPrice] = useState(coursePrice);
  const [category, setCategory] = useState(courseCategory);
  // Adjust height of textarea
  const textareaRef = useRef(null);
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    adjustHeight(); // Adjust height on mount if there's initial content
  }, [description]);
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
  // edit course API

  const handleEditCourse = async () => {
    if (!courseId || !title || !description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const toastId = toast.loading("Updating course...");

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: title,
          description: description,
          peice: price,
          type: category,
        })
      );

      if (thumbnailImage) {
        formData.append("files.media", thumbnailImage);
      }

      const response = await axios.put(
        `${utils.BASE_URL}courses/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.update(toastId, {
          render: "Course updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        navigate("/courses");
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.log("Error updating course:", error.message);
      toast.error("Failed to update the course. Please try again.");
    }
  };

  return (
    <>
      <section className="bg-[#F7F7F7] flex flex-col lg:flex-row  gap-7 pb-5">
        <div className="2xl:basis-1/3 lg:basis-1/2 shadow-none flex  flex-col gap-7 font-semibold  text-lg">
          <h2 className="text-xl font-medium ">Details</h2>
          <p className="text-gray-600 text-base font-normal">
            Give your course a title, add a description, and upload a course
            thumbnail image. This image will show in your customer's library of
            courses they have purchased from you.
          </p>
        </div>
        <Card className="w-full">
          <CardContent className="p-10">
            <div className="mb-6">
              <div className="space-y-1 pb-3">
                <Label htmlFor="current">Course Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="current"
                  placeholder="Title"
                  type="settings"
                />
              </div>
              <div>
                <h2 className="text-base font-semibold mt-5 text-gray-800">
                  Select Category
                </h2>
                <div>
                  <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full py-2 mt-1">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Courses">Courses</SelectItem>
                      <SelectItem value="Classes">Classes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid w-full mt-5 gap-1.5">
                <Label htmlFor="message-2">Course Description</Label>
                <textarea
                  value={description}
                  ref={textareaRef}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    adjustHeight();
                  }}
                  placeholder="Description"
                  id="message-2"
                  className="resize-none overflow-hidden rounded-md border border-gray-300 w-full border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
              <div className="space-y-1 pb-3 pt-3">
                <Label htmlFor="current">Course Price</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="current"
                  placeholder="Price"
                  type="number"
                />
              </div>

              <div className="mt-5">
                <Label htmlFor="message-2">Course Thumbnail</Label>
                <div className="border rounded-lg p-6  flex lg:flex-row flex-col items-center gap-10">
                  {previewThumbnailImage ? (
                    <img
                      src={previewThumbnailImage}
                      alt={previewThumbnailImage}
                      className="w-32 h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="w-[35%] h-36 bg-gray-200 rounded-md flex items-center justify-center">
                      <img
                        src={`${utils.BASE_URL_MEDIA}${thumbnailImage}`}
                        alt="course thumbnail"
                        className="w-32 h-32 object-cover rounded"
                      />
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
                        // accept="image/*"
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

      {/* <section className=" bg-[#f8f8f8] flex gap-5  border-t-2 py-8">
        <div className="flex max-w-[33%] gap-3 flex-col">
          <CardTitle>Live Rooms</CardTitle>
          <CardDescription>
            Give your live sessions a title and description. These details will
            appear in your student's course.
          </CardDescription>
          <CardDescription>
            Live sessions are limited to 200 participants.
          </CardDescription>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full  space-y-6">
            <div>
              <div className="space-y-4 ">
                <Controller
                  control={control}
                  name="marketing_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center bg-white gap-3 rounded-2xl border p-8 shadow-sm">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-0.5">
                        <FormLabel>
                          Provide a live video session tor this course
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </section> */}
      {/* <section className=" bg-[#f8f8f8] flex gap-5  border-t-2 py-8">
        <div className="flex max-w-[33%] gap-3 flex-col">
          <CardTitle>Community</CardTitle>
          <CardDescription>
            Link your Course and community products together to create a more
            engaging member experience. This will add an existing community
            circle to your course member experience.{" "}
            <Button
              className="underline px-1 text-gray-600 hover:text-gray-800"
              variant="link"
            >
              Learn more
            </Button>
          </CardDescription>
        </div>
        <FormProvider {...methods} className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full   space-y-6"
          >
            <div>
              <div className="space-y-4 ">
                <Controller
                  control={control}
                  name="marketing_emails"
                  render={({ field }) => (
                    <>
                      <FormItem className="flex flex-row items-center bg-white gap-3 rounded-2xl border p-8 shadow-sm">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel>
                            Enable community for this course
                          </FormLabel>
                          <FormDescription>
                            <Button
                              className="underline px-1 font-base text-gray-600 hover:text-gray-800"
                              variant="link"
                            >
                              Create a community:
                            </Button>
                            to use this feature.
                          </FormDescription>
                        </div>
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </section> */}
      {/* <section className=" bg-[#f8f8f8] flex gap-5  border-t-2 py-8">
        <div className="flex max-w-[33%] gap-3 flex-col">
          <CardTitle>Community</CardTitle>
          <CardDescription>
            Set how comments are enabled for your courses, When comments are
            enabled, you can individually configure comment behavior per lesson.
            <Button
              className="underline px-1  hover:text-blue-800"
              variant="link"
            >
              Learn more
            </Button>
          </CardDescription>
        </div>
        <FormProvider {...methods} className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full   space-y-6"
          >
            <div className="flex flex-col">
              <div className="space-y-4 ">
                <Controller
                  control={control}
                  name="marketing_emails"
                  render={({ field }) => (
                    <>
                      <FormItem className="flex flex-row items-center bg-white gap-3 rounded-2xl border p-8 shadow-sm">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div>
                          <div className="space-y-0.5">
                            <FormLabel>Enable comments</FormLabel>
                            <FormDescription>
                              Comments are visible by default for each lesson.
                              When comments are enabled, you can still override
                              Comments per lesson as needed.
                            </FormDescription>
                          </div>
                          <div className="flex items-start gap-3 pt-5">
                            <FormControl className="mt-1">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1">
                              <FormLabel>Enable comments</FormLabel>
                              <FormDescription>
                                Comments are visible by default for each lesson.
                                When comments are enabled, you can still
                                override Comments per lesson as needed.
                              </FormDescription>
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </section> */}
      <section className="bg-[#f8f8f8]">
        <CardFooter className="flex justify-between items-center">
          <Button className="text-red-500 p-0" variant="link">
            <Trash2 /> Delete Post
          </Button>
          <Button className="rounded-full" onClick={handleEditCourse}>
            Save
          </Button>
        </CardFooter>
      </section>
    </>
  );
};

export default CourseSettingsTab;
